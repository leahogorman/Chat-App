/* CONTROLLER FOLDER ========================================
The controller is the logical related to interaction and
'controlling' behaviour. In our serer-side code, the only
real controller elements are the 'router', so we create a
router folder
====================================================== */

const orm = require('../models/orm');
const authenticateUser=require('../users/authenticate-users');
const registerUser=require('../users/register-users');

function router(app) {
    app.get('/saved',async (req, res) => {
        const result = await orm.getMsg()
        console.log(result)
        res.send(result)
    });

    app.get('/api/data', async (req, res) => {
        const result = await orm.getData()
        console.log(result)
        res.send(result)


        // res.sendFile(__dirname + '/index.html')
    });

    app.post('/api/send', async(req,res)=> {
        console.log('post recieved: ', req.body.message)
        const result = await orm.insertMsg(req.body.message)
        console.log(result)
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

module.exports = router
