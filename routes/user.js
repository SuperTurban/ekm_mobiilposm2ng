const base_path = '/app/user';

var jwt = require('jsonwebtoken');
var User = require('./../models/user.js');
let bcrypt = require('bcrypt');

module.exports = function(app){
    app.get(base_path + '/maketestadminuser', function(req,res){

        let password = bcrypt.hash('testpassword', 10)
            .then(function(hash){
                if(false)
                    return console.log(err);
                else {
                    let user = new User({
                        username : 'ekmadmin',
                        password : hash,
                        admin : 1,
                        email : 'admin@localhost'
                    })

                    user.save(function(err, r){
                        if(err)
                            return console.log(err);
                        else{
                            return res.send(r);
                        }
                    })
                }
             });

    });

    
};