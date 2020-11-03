// /* ORM FOLDER ========================================
// We abstract our database and information-modelling code
// into this section
// ====================================================== */

const db = require( '../config/connection.js' )




function getData(){
    return db.query( 'SELECT * FROM chatlogs');
}

function getRoomId(room){
    return db.query('SELECT id FROM ROOM where roomname = ?',[room])
}

function insertMsg(id,user,msg){
    return db.query('INSERT INTO chatlogs (id,username,message) VALUES (?,?,?)',[id,user,msg])
}

function getMsg(){
    return db.query('SELECT (message) FROM chatlogs')
}

function getUser(){
    return db.query('SELECT (username) FROM USERS')
}

function passwordMatch(user,password){
    return db.query('SELECT (?) FROM users WHERE PASSWORD = ?',[user,password]);
}

function showRooms(){
    return db.query('SELECT roomname FROM ROOM')
}

function createRoom(room){
    return db.query('INSERT INTO ROOM (roomname) VALUES (?)',[room])
}


function signUp(user,pass){
    return db.query('INSERT INTO USERS (username,password) VALUES (?,?)',[user,pass])
}



module.exports = {
    getData, insertMsg, getMsg, getUser, passwordMatch, showRooms, createRoom, signUp, getRoomId
}