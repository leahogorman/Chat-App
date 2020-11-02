$('#login-form').show()
$('#room').hide()
$('#chatroom').hide()



//room and login requests
let username = '/'
var socket = io(username);

function postUrl( url, data={} ){
    const postData = {
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify( data )
    }
    return fetch( url,postData ).then( res=>res.json() )
}



async function createroom(room){
    const result = await postUrl('/api/create',{Room : room})
    console.log('room created: ', result)
    result?showroom():error();
}

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


async function chooseroom(roomname){
    socket = io('/' + username);
    const result = await postUrl('/api/choose',{room : roomname})
    console.log( result)
    $('#room').hide()
    $('#loginform').hide();
    $('#chatroom').show()
    
//    chat()
    setConnection();
}

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

document.querySelector('#submit').addEventListener('click',function(e){
    e.preventDefault();
    login(document.querySelector('#user').value,document.querySelector('#pass').value)
})

document.querySelector('#button-create').addEventListener('click',function (e){
    e.preventDefault();
    const val = document.querySelector('#create-room').value
    createroom(val)
})


function setConnection(){
    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
    });
}


//sending message
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