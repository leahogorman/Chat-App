//const Cryptr = require('cryptr');
const db = require('../config/connection');
// cryptr = new Cryptr('myTotalySecretKey');

module.exports.register=async function( userData ){
    var today = new Date();
    // FIXME
    // var encryptedString = Cryptr.encrypt(req.body.password);
    console.log( '[module: register] req.body: ', userData )
    //var encryptedString = userData.password;
    var users={
        'first_name':userData.name,
        'username':userData.user,
        'password':userData.password
    }
    const result = await db.query('INSERT INTO USERS SET ?',users)
    console.log( 'db write: ', result )
    if( result.affectedRows===1 ){
        const username = userData.user
        console.log( '... inserted the user: results=', username )
        return { status: true, username, message: `Successfully inserted user: #${username}` }
    } else {
        return { status: false, message: 'Sorry couldnt write database '}
    }
}
