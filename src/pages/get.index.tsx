import { Database } from "query:database";
import html from "./index.html";

interface Message {
    id: number;
    sender_id: number;
    text: string;
    name: string;
    created_at: string;
}

export async function handleRequest(req: Request) {
    try {
        const headers = new Headers();
        let userName = getUserNameFromCookie(req);

        if (!userName) {
            userName = Math.random().toString(36).substring(2);
            const db = new Database("chat.sql");
            db.query("INSERT OR IGNORE INTO user (name) VALUES (?)", [userName]);
            headers.append("set-cookie", `user_name=${userName}; Expires=3600000; Max-Age=3600000; HttpOnly; SameSite=Strict; Secure;`);
        }

        const result: Message[] | [] = getMessages();
        const messagesHtml = result.map(createMessageHtml.bind(null, userName)).join("");
        const stylesUrl = getAssetUrl("dist/styles.css");
        const responseHtml = html.replace("{{ styles }}", stylesUrl).replace("{{ messages }}", messagesHtml);

        headers.set("Content-Type", "text/html; charset=utf-8");

        return new Response(responseHtml, {
            status: 200,
            headers,
        });
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            return new Response(`${error.message}\\n${error.stack || ""}`, {
                status: 500,
                headers: {
                    "Content-Type": "text/plain",
                },
            });
        }

        return new Response("Internal Server Error", {
            status: 500,
            headers: {
                "Content-Type": "text/plain",
            },
        });
    }
}

function getUserNameFromCookie(req: Request): string | null {
    const cookie = req.headers.get("cookie");
    if (!cookie) return null;
    const match = cookie.match(/user_name=([\w-]+)/);
    return match ? match[1] : null;
}

function getMessages(): Message[] | [] {
    try {
        const db = new Database("chat.sql");
        return db.query(`
            SELECT m.*, u.name
            FROM message m
            JOIN user u ON m.sender_id = u.id
            ORDER BY m.created_at ASC
        `);
    } catch (error) {
        console.error(error);
        return [];
    }
}

function createMessageHtml(currentUserName: string, message: Message): string {
    return /*html*/ `
        <div class="message ${message.name === currentUserName ? "message-sent" : "message-received"}">
            <p class="text-sm">${escapeHtml(message.text)}</p>
            <p class="message-time">By ${message.name} at ${new Date(message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
        </div>
    `;
}

function escapeHtml(unsafe: string) {
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function getAssetUrl(fileName: string): string {
    const db = new Database("query_asset.sql");
    const result = db.query("SELECT name_hashed FROM asset WHERE name = ?", [fileName]) as { name_hashed: string }[];

    return `/_/asset/${result[0].name_hashed}`;
}
