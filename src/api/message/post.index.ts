import { Database } from "query:database";

export async function handleRequest(req: Request) {
    const formData = await req.formData();
    const text = formData.get("message") as string;
    const userName = formData.get("userName") as string;

    const db = new Database("chat.sql");

    const userResult: { id: string }[] = db.query("SELECT id FROM user WHERE name = ?", [userName]);

    if (userResult.length === 0) {
        return new Response(JSON.stringify({ success: false, error: "User not found" }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    const userId = userResult[0].id;

    db.query("INSERT INTO message (user_id, text, created_at) VALUES (?, ?, datetime('now'))", [userId, text]);

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
