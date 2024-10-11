CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS message (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id)
);

-- Insert some initial user
INSERT INTO
    user (name)
SELECT
    'c477c7ee'
WHERE
    NOT EXISTS (
        SELECT
            1
        FROM
            user
        WHERE
            name = 'c477c7ee'
    );

-- Insert some initial message
INSERT INTO
    message (user_id, text, created_at)
SELECT
    1,
    'Hi!',
    '2024-01-01 00:00:00'
WHERE
    NOT EXISTS (
        SELECT
            1
        FROM
            message
    );