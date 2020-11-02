$('#login-form').show()
$('#room').hide()
$('#chatroom').hide()




let username = '/'
var socket = io(username);
//function for sending POST requests
function postUrl( url, data={} ){
    const postData = {
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify( data )
    }
    return fetch( url,postData ).then( res=>res.json() )
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
    socket = io('/' + username);
    const result = await postUrl('/api/choose',{room : roomname})
    console.log( result)
    $('#room').hide()
    $('#loginform').hide();
    $('#chatroom').show()
    console.log('client side nsp: ', '/' + username)
//    chat()
    setConnection();
}

//generic error function -needs to be modified
function error(){
    alert('invalid info')
}


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

document.querySelector('#signup').addEventListener('click',function(e){
    e.preventDefault();
    signup(document.querySelector('#user').value,document.querySelector('#pass').value)
})
//#submit is the kogin button
document.querySelector('#submit').addEventListener('click',function(e){
    e.preventDefault();
    login(document.querySelector('#user').value,document.querySelector('#pass').value)
})

document.querySelector('#button-create').addEventListener('click',function (e){
    e.preventDefault();
    const val = document.querySelector('#create-room').value
    createroom(val)
})

//sets the socket connection
function setConnection(){
    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
    });
}


//when send is click the message is sen to the server and the database
$('form').submit(async function(e) {

    e.preventDefault();
    socket.emit('chat message', $('#m').val());
    let message = $('#m').val()

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