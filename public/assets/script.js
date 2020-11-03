$('#login-form').show()
$('#room').hide()
$('#chatroom').hide()

let username = '/default-user'
var socket = io(username);

function postUrl( url, data={} ){
    const postData = {
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify( data )
    }
    return fetch( url,postData ).then( res=>res.json() )
}


async function initChatRoom(){
    const list = await fetch( '/saved').then( r=>r.json() )

    //function for sending POST requests
}

//Triggers when user creates room
async function createroom(room){
    const result = await postUrl('/api/create',{Room : room})
    console.log('room created: ', result)
    result?showroom():error();
}

//shows a list of rooms;
async function showroom(){
    $('#login-form').hide();
    $('#room').show()

    let list = await fetch ('/api/rooms').then(r=>r.text());
    list = JSON.parse(list);
    document.querySelector('#roomlist').innerHTML = '';
    list.forEach(el=>{

        $('#messages').append($('<li>').text(el.message));
        console.log(el);
        let g = document.createElement('button')
        g.innerHTML = el.roomname
        g.addEventListener('click',function(e){
            e.preventDefault();
            console.log(el.roomname)
            chooseroom(el.roomname)
        })
        document.querySelector('#roomlist').append(g)

    })
}

async function chat() {
    //const list = await fetch( '/saved').then( r=>r.json() )

    // list.forEach(el=>{
    //     $('#messages').append($('<li>').text(el.message));
    //     console.log(el);
    // })

    // const result = await fetch('/api/data')
    //     .then(r=>r.json())
    // console.log('result: ',result)
}

//triggers when user chooses a room
async function chooseroom(roomname){
    //socket = io('/' + username);
    // setConnection();
    const result = await postUrl('/api/choose',{room : roomname})
    console.log( result)
    // $('#room').hide()
    // $('#loginform').hide();
    $('#chatroom').show()
    socket.emit('room', roomname);

}

//generic error function -needs to be modified
function error(){
    alert('invalid info')
}
document.querySelector('#create-room').addEventListener('click',function(e){
    e.preventDefault;
    const val = e.target.value;
    chooseroom(val);
})

async function login(user,password){
    const result = await postUrl('/login',{login: user, pass: password});
    username = user;
    result? showroom(): error();
    console.log('user info sent: ', {login: user, pass: password})
}

async function signup(user,password){
    const result = await postUrl('/signup',{login: user, pass: password});
    result? login(user,password):error()
}

//sets the socket connection
socket.on('message', function(msg){
    $('#messages').append($('<li>').text(msg));
})
//when send is click the message is sen to the server and
// document.querySelector('#send').addEventListener('click', (async function(e) {

//     e.preventDefault();
//     socket.emit('message', $('#m').val());
//     let message = $('#m').val()


//     $.ajax('/api/send', {
//         type: 'POST',
//         data: {message}
//     }).then(
//         function() {
//             console.log('messsage sent');
//         }
//     );

//     $('#m').val('');
// }))

socket = io('/my-namespace');
$('form').submit(async function(e) {
    e.preventDefault();
    socket.emit('chat message', $('#m').val());
    let message = $('#m').val()
    // const result2 = await postUrl('/api/send',$('#m').val())
    // console.log(result2);
    $.ajax('/api/send', {
        type: 'POST',
        data: {message}
    }).then(
        function() {
            console.log('messsage sent');
        }
    );

    $('#m').val('');

    return false;
});
socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
});


$(function () {
    let url = window.location.href
    url = url.substr(url.lastIndexOf('/')).replace('.html','')
    console.log( `.. initialing room: ${url}` )

    // verify user is logged in
    if( url==='/login' || url==='/register' ){
        // no authentication needed for these pages
    } else {
        if( !localStorage.userID ){
            location.href = '/index.html'
        }
    }

    // load any init code for respective rooms here
    if( url==='/chatroom' ){
        initChatRoom()
    }
})