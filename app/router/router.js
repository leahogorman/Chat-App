/* CONTROLLER FOLDER ========================================
The controller is the logical related to interaction and
'controlling' behaviour. In our serer-side code, the only
real controller elements are the 'router', so we create a
router folder
====================================================== */

const orm = require('../models/orm');

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

}

module.exports = router
