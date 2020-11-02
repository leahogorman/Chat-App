-- DROP DATABASE CHAT_DATA;
CREATE DATABASE CHAT_DATA;
USE CHAT_DATA;


DROP TABLE if exists USERS;
CREATE TABLE USERS (
    `id` int(11) NOT NULL AUTO_INCREMENT, 
    `name` varchar(255) NOT NULL, 
    `username` varchar(255) NOT NULL, 
    `password` varchar(255) NOT NULL, 
    `created_at` datetime NOT NULL, 
    `updated_at` datetime NOT NULL, 
    PRIMARY KEY (`username`)) 
    

DROP TABLE if exists ROOM;
CREATE TABLE ROOM(
    `id` INTEGER AUTO_INCREMENT PRIMARY KEY,
    `roomname` VARCHAR (35) NOT NULL UNIQUE
--     `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE if exists chatlogs;
CREATE TABLE chatlogs(
    `id` INTEGER NOT NULL,
    `username` VARCHAR (35) NOT NULL UNIQUE,
    `message` VARCHAR(500) NOT NULL,
--     `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (username) REFERENCES USERS(username),
    FOREIGN KEY (id) REFERENCES ROOM(id)
    ON DELETE CASCADE
);
