// function postUrl( url, data={} ){
//     const postData = {
//         headers: { 'Content-Type': 'application/json' },
//         method: 'post',
//         body: JSON.stringify( data )
//     }
//     return fetch( url,postData ).then( res=>res.json() )
// }
const upperCaseCharacters = /[A-Z]/g //['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const lowerCaseCharacters = /[a-z]/g // ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','','x','y','z'];
const numericalCharacters = /[0-9]/g //['1','2','3','4','5','6','7','8','9','0'];
const minimumLength = 8

function validatePassword( password ){
    let input = false
    // allows user to input required charcaters
    if ( password.length >= minimumLength ){
        input = true;
    } else {
        alert ( 'must have a minimum of 8 characters' )
        return false;
    }

    if ( password.match(upperCaseCharacters) ) {
        input = true;
    } else {
        alert( 'must include a minimum of 1 uppercase characters' )
        return false;
    }

    if ( password.match(lowerCaseCharacters) ) {
        input = true;
    } else {
        alert( 'must include a minimum of 1 lowercase characters' )
        return false;
    }

    if ( password.match(numericalCharacters) ) {
        input = true;
    } else {
        alert( 'must include a minimum of 1 numerical characters' )
        return false;
    }

    // password is ok! lets use it!
    console.log( `password (${password}) input(${input})` );
    return true
}

function checkPassword() {
    var x = document.getElementById('password');
    if (x.type === 'password') {
        x.type = 'text';
    } else {
        x.type = 'password';
    }
}

async function loginUser( event ){
    event.preventDefault()
    // get the user info and post it
    const userData = {
        user: $('#user').val(),
        password: $('#password').val()
    }
    console.log( '..attempting to log user in:', userData )
    const result = await $.ajax({ url: '/api/users/authenticate', method: 'post', data: userData })
    if( result.status ){
        // login ok, so now save
        console.log( '.. user login successs! saving the userID' )
        localStorage.userID = result.userID
        // anything else like redirect
        window.location.href = '/home.html'
    } else {
        // nvalid login
        alert( result.message )
    }
}

async function registerUser( event ){
    console.log( '[registerUser]' )
    event.preventDefault()

    // check password is secure -- "brooklynize" this app
    const isPasswordValid = validatePassword( $('#password').val() )
    console.log( 'isPasswordValid = ', isPasswordValid )
    if( !isPasswordValid ){
        alert( 'Sorry but please, we are a SECURE chat app. Your password needs improving.' )
        return
    }
    // get the user info and post it
    let userData = {
        name: $('#name').val(),
        user: $('#user').val(),
        password: $('#password').val()
    }

    console.log( '.. attempting to /api/users/register' )

    const result = await $.ajax( { url: '/api/users/register', method: 'post', data: userData } )
    console.log( ' .... registered user: ', result )
    if( !result.status ){
        alert( result.message )
        return;
    }

    // successfully registere the user
    alert( result.message )
    window.location.href = '/login.html'
}

async function initChatRoom(){
    const list = await fetch( '/saved').then( r=>r.json() )

    list.forEach(el=>{
        $('#messages').append($('<li>').text(el.message));
        console.log(el);
    })

    const result = await fetch('/api/data')
        .then(r=>r.json())
    console.log('result: ',result)

    var socket = io('/my-namespace');
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
}

$(function () {
    let url = window.location.href
    url = url.substr(url.lastIndexOf('/')).replace('.html','')
    console.log( `.. initialing room: ${url}` )

    // verify user is logged in
    if( url==='/login' || url==='/register' ){
        // no authentication needed for these pages
    } else {
        if( !localStorage.userID ){
            location.href = '/login.html'
        }
    }

    // load any init code for respective rooms here
    if( url==='/chatroom' ){
        initChatRoom()
    }
});