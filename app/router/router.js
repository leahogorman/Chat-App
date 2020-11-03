/* CONTROLLER FOLDER ========================================
The controller is the logical related to interaction and
'controlling' behaviour. In our serer-side code, the only
real controller elements are the 'router', so we create a
router folder
====================================================== */
const socket = require('./socket')
const db = require('../config/connection');
const orm = require('../models/orm');

const authenticateUser=require('../users/authenticate-users');
const registerUser=require('../users/register-users');

let username = 'admin';
let room = 'default';


function router(app) {
    app.get('/saved',async (req, res) => {
        const result = await orm.getMsg()
        //console.log(result)
        res.send(result)
    });

    app.get('/api/data', async (req, res) => {
        const result = await orm.getData()
        //console.log(result)
        res.send(result)
        // res.sendFile(__dirname + '/index.html')
    });

    //needs some changes
    app.get('/api/rooms', async(req,res)=>{
        const result = await orm.showRooms()
        console.log(JSON.stringify(result))
        res.send(JSON.stringify(result))
    });

    app.post('/api/send', async(req,res)=> {
        console.log('post recieved: ', req.body.message)
        let result = await orm.getRoomId(room)
        result = JSON.parse(JSON.stringify(result))[0].id?JSON.parse(JSON.stringify(result))[0].id:null;
        result = await orm.insertMsg(result,username,req.body.message)
        res.send(result)
    });

    app.post('/login', async (req,res)=>{
        username = req.body.login;
        const password = req.body.pass;
        const result = await orm.passwordMatch(username,password);
        console.log('logged in as: ', username)
        res.send(result.length!==0);
    });

    app.post('/api/create', async(req,res)=>{
        const result = await orm.createRoom(req.body.Room)
        res.send(result)
    })

    app.post('/api/choose', async(req,res)=>{
        room = req.body.room
        socket.setRoom(room)
        console.log('room chosen: ', room);
        res.send({message:'room choosen'});
    })

    app.post('/signup', async (req,res)=>{
        const regex = /^((?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/gm
        const user = req.body.login;
        const password = req.body.pass;
        console.log('login info: ', user, password)
        const result = regex.test(password)? await orm.signUp(user,password): false;
        console.log(regex.test(user))
        res.send(result)

    })

    app.post('/api/users/register', async (req,res)=>{
        const registerResult = await registerUser.register( req.body )
        console.log( '.. got the result: registerResult', registerResult )
        res.send( registerResult )
    });
    app.post('/api/users/authenticate', async (req,res)=>{
        const username = req.body.user
        const password = req.body.password
        console.log( `[/api/users/authenticate] username(${username}) password(${password})` )
        const loginResult = await authenticateUser.authenticate( username,password )
        console.log( '.. attempted to login the user: ', loginResult )
        res.send( loginResult )
    });

}

module.exports = {router}
