import { Database } from "query:database";

export async function handleRequest(req: Request) {
    const formData = await req.formData();
    const text = formData.get('text') as string;
    const sent = formData.get('sent') === 'true';

    const db = new Database("chat.sql");
    db.query("INSERT INTO messages (text, sent, created_at) VALUES (?, ?, datetime('now'))", [text, sent ? 1 : 0]);

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
