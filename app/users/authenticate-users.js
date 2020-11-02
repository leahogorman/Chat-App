var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');

var connection = require('../config/connection');
module.exports.authenticate=function(req,res){
    var user=req.body.user;
    var password=req.body.password;


    connection.query('SELECT * FROM users WHERE user = ?',[user], function (error, results, fields) {
        if (error) {
            res.redirect('/login.html');
        }else{

            if(results.length >0){
                decryptedString = cryptr.decrypt(results[0].password);
                if(password===decryptedString){
                    res.send ({
                        status: true,
                        userID: results[0].username
                    }
                    );
                }else{
                    res.send ({
                        status: false,
                        message: 'Invalid Password'
                    })
                }

            } else{
                res.send ({
                    status: false,
                })
            }
        }
    });
}

