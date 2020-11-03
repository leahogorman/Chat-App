// /* ORM FOLDER ========================================
// We abstract our database and information-modelling code
// into this section
// ====================================================== */

const db = require( '../config/connection.js' )

//error handling function -needs callback
function insertone(table, cols, vals, cb) {
    console.log('colums are', cols , 'values are', vals)
    connection.query('INSERT INTO ?? (??) VALUES (?)' ,[table, cols, vals], function(err, result){
        if (err){
            throw err;
        }
        cb(result);
    });
}


// function getList( criteria={} ){
//     return db.query( 'SELECT * FROM tasks '+( criteria ? 'WHERE ? ' : '' ), criteria )
// }
function getData(){
    return db.query( 'SELECT * FROM chatlogs');
}

function getRoomId(room){
    return db.query('SELECT id FROM ROOM where roomname = ?',[room])
//    return db.query('INSERT INTO chatlogs (id,username,message) VALUES (?,?,?)',[id,user,msg])
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
//needs to be fixed
function passwordMatch(user,password){
    return db.query('SELECT (?) FROM users WHERE PASSWORD = ?',[user,password]);
}

function showRooms(){
    return db.query('SELECT roomname FROM ROOM')
}
//db.query('SELECT roomname FROM ROOM WHERE roomname = ?',[room]).length === 0?
//needs to be fixed
function createRoom(room){
    return db.query('INSERT INTO ROOM (roomname) VALUES (?)',[room])
}


function signUp(user,pass){
    return db.query('INSERT INTO USERS (username,password) VALUES (?,?)',[user,pass])
}

function chooseRoom(room){
}
// function insertTask( priority, info, due ){
//     if( priority === '' ) {
//         priority = 'primary'
//     }
//     // no due? set to 7 days from now
//     if( due === '' ) {
//         due = moment().add(7, 'days').format('YYYY-MM-DD' )
//     }
//     console.log( ' inserting task data: ', { priority, info, due } )
//     return db.query( 'INSERT INTO tasks SET ? ',
//         { priority, info, due } )
// }

// function updateTask( id, priority, info, due ){
//     return db.query( 'UPDATE tasks SET ? WHERE id=?',
//         [ { priority, info, due }, id ] )
// }

// function deleteTask( id ){
//     return db.query( 'DELETE FROM tasks WHERE id=?', [ id ] )
// }

module.exports = {
    getData, insertMsg, getMsg, getUser, passwordMatch, showRooms, createRoom, signUp, getRoomId
}