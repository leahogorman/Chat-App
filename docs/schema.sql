DROP DATABASE CHAT_DATA;
CREATE DATABASE CHAT_DATA;
USE CHAT_DATA;

CREATE TABLE chatlogs(
    `id` INTEGER AUTO_INCREMENT PRIMARY KEY,
    'username' VARCHAR (35),
    `message` VARCHAR(500) NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)