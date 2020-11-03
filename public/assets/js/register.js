function checkPassword() {
    var x = document.getElementById('password');
    if (x.type === 'password') {
        x.type = 'text';
    } else {
        x.type = 'password';
    }
}

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
    window.location.href = '/index.html'
}

