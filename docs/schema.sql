-- DROP DATABASE CHAT_DATA;
CREATE DATABASE CHAT_DATA;
USE CHAT_DATA;

DROP TABLE if exists USERS;
CREATE TABLE USERS(
    username VARCHAR (35) NOT NULL UNIQUE PRIMARY KEY,
    first_name VARCHAR(50),
    `password` VARCHAR(64),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

DROP TABLE if exists ROOM;
CREATE TABLE ROOM(
    `id` INTEGER AUTO_INCREMENT PRIMARY KEY,
    `roomname` VARCHAR (35) NOT NULL UNIQUE
    
--     `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE if exists chatlogs;
CREATE TABLE chatlogs(
    `id` INTEGER NOT NULL PRIMARY KEY,
    `username` VARCHAR (35) NOT NULL UNIQUE,
    `message` VARCHAR(500) NOT NULL
--     `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- PRIMARY KEY (id),
    -- FOREIGN KEY (username) REFERENCES USERS(username) ON DELETE CASCADE,
--     FOREIGN KEY (id) REFERENCES ROOM(id) ON DELETE CASCADE
);