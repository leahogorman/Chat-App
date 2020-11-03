
let room;

function setRoom(r){
    room = r;
}



function init(http){
    var io = require('socket.io')(http);
    var nsp = io.of('/default-user');

    nsp.on('connection', (socket) => {
        console.log('connection established')
        socket.on('room', (msg) => {
            socket.join(msg)
            console.log('[socket] room joined: ' + msg);
            console.log(socket.room)
            nsp.emit('room joined: ' , msg);
        })

        socket.on('message', (msg) => {
            console.log('[socket] msg: ' + msg);
            console.log(socket.rooms)
            nsp.emit('message', msg);
        })

        socket.on('logged-in', (user)=>{
            nsp.emit('useradd', user)
        })
    });

}


module.exports = {init,setRoom}




