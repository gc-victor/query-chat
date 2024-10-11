import { Database } from "query:database";

export async function handleRequest(req: Request) {
    const formData = await req.formData();
    const task = formData.get("task") as string;
    const taskId = formData.get("taskId") as string;

    const db = new Database("todo.sql");

    if (task) {
        db.query("INSERT INTO todo (name) VALUES (?)", [task]);
    } else if (taskId) {
        db.query("DELETE FROM todo WHERE id = ?", [taskId]);
    }

    const url = new URL(req.url);

    return Response.redirect(`${url.origin}/`, 303);
}
