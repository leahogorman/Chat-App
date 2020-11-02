require( 'dotenv' ).config() // looks for .env ; process.env gets it's values

const bodyParser = require('body-parser')


const express = require('express');
const apiRouter = require('./app/router/router.js').router;
const app = express();
const http = require('http').createServer(app);
const socket = require('./app/router/socket.js');
socket.init(http)
const PORT = process.env.PORT || 3000

// for parsing incoming POST data
//app.use(express.urlencoded({ extended: true }))
//app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
// for serving all the normal html
app.use( express.static('public') );






apiRouter(app)





http.listen(3000, () => {
    console.log('SERVER LISTENING ON *:3000');
});



