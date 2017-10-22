const base_path = '/app/user';

var jwt = require('jsonwebtoken');
var User = require('./../models/user.js');
let bcrypt = require('bcrypt');

module.exports = function(app){

    app.get(base_path + '/maketestadminuser', function(req,res){
        let password = bcrypt.hash('testpassword', 10)
            .then(function(hash){

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
             });

    });

    app.post(base_path + '/register', function(req,res){

        let user = new User({
            username : req.body.username, 
            email    : req.body.email,
            admin    : 0,
        });

        user.save(function(err, data){
            if(err){
                return res.json({
                    status : 'failure', 
                    message : 'email või nimi juba kasutuses'
                });
            }
            else{
                res.json({
                    status : 'ok',
                    username : data.username,
                    email : data.email,
                    uid : data._id,
                });
            }
        })




    });

    
};