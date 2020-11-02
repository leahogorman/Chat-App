
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
            console.log('msg1: ' + msg);
            nsp.emit('room joined: ' , msg);
        })

        socket.on('message', (msg) => {
            console.log('room: ' + room);
            nsp.in(room).emit('message', msg);
        })

        socket.on('logged-in', (user)=>{
            nsp.emit('useradd', user)
        })
    });

}
// function socket(user,room) {
//     const io = require('socket.io')(http);
//     let nsp = io.of('/HEllo');
//     console.log('socket function is running')
//     console.log('server nsp: ', user)
//     console.log('server room: ', room )

//     nsp.on('connection', socket => {
//         console.log(user,' connected');
//         socket.join('epstein');
//         console.log(room, ' joined');
//         socket.on('chat message', (msg,id) => {
//             nsp.emit('chat message', msg);
//         })
//     });


// }




module.exports = {init,setRoom}




