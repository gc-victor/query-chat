CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS message (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES user (id)
);

-- Insert some initial user
INSERT INTO
    user (name)
VALUES
    ('c477c7ee');

-- Insert some initial message
INSERT INTO
    message (sender_id, text, created_at)
VALUES
    (1, 'Hi!', '2024-01-01 00:00:00');