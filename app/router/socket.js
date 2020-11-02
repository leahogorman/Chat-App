
let http;
function sendHttp(x){
    http=x;
}

function socket() {
    let user = '/' + require('./router').username
    let room = require('./router').room
    const io = require('socket.io')(http);
    let nsp = io.of(user);
    console.log('socket function is running')
    //custom namespace for rooms
    nsp.on('connection', socket => {
        console.log(user,' connected');
        socket.join(room);
        console.log(room, ' joined');
        socket.on('chat message', (msg,id) => {
            nsp.emit('chat message', msg);
        })
    });


    nsp.use((socket, next) => {
        next();
    });
}




module.exports = {sendHttp,socket}




