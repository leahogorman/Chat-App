


function socket(http) {
    const io = require('socket.io')(http);
    const nsp = io.of('/my-namespace');

    //custom namespace for rooms
    // nsp.on('connection', socket => {
    //     console.log('someone connected');
    //     socket.join('room');
    //     console.log("room joined");
    //     socket.on('connection', (id, msg) => {
    //         socket.to(id).emit('my message', msg);
    //         var epstein = id
    //         console.log("id: ",epstein);
    //     });
    // });

    // nsp.use((socket, next) => {
    //     next();
    // });

    //Coonects to a socket and then logs the id
    io.on('connection', (socket) => {
        console.log('a user connected');
        console.log('socket id: ', socket.id);
        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
        })

        socket.on('disconnect', () => {
            console.log('user disconnected')
        })



     });
}

module.exports = socket




