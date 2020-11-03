var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');

var db = require('../config/connection');
module.exports.authenticate=async function(user,password){
    const result = await db.query('SELECT * FROM users WHERE username = ?',[user])
    console.log( ' ... database result: ', result )
    if( result.length<1 ){
        return { status: false, message: 'Sorry unknown user' }
    }
    const userData = result[0]

    // FIXME
    //decryptedString = cryptr.decrypt(results[0].password);
    const decryptedString = userData.password
    if(password===decryptedString){
        return {
            status: true,
            userID: userData.username
        }
    } else {
        return {
            status: false,
            message: 'Oops you got the password wrong'
        }
    }
}

