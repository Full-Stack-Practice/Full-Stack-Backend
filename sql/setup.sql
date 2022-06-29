-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS albums;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);

CREATE TABLE albums (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    album_name TEXT NOT NULL,
    artist TEXT NOT NULL,
    genre TEXT NOT NULL,
    release_date TEXT NOT NULL,
    user_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);