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
