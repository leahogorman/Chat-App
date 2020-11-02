var Cryptr = require('cryptr');
var connection = require('../config/connection');
// cryptr = new Cryptr('myTotalySecretKey');

module.exports.register=function(req,res){
    var today = new Date();
    var encryptedString = cryptr.encrypt(req.body.password);
    var users={
        'name':req.body.name,
        'user':req.body.user,
        'password':encryptedString,
        'created_at':today,
        'updated_at':today
    }
    connection.query('INSERT INTO USERS SET ?',USERS, function (error, results, fields) {
        if (error) {
            res.redirect('/register.html');
        }else{
            res.redirect('/login.html');

        }
    });
}
