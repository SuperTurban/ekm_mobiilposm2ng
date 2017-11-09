const base_path = '/app/auth';

var jwt = require('jsonwebtoken');
var User = require('./../models/user.js');

module.exports = function(app){

    app.get(base_path + '/test', function(req,res){
        let token = jwt.sign({foo: 'bar'}, 'someting');
        return res.send(jwt.verify(token, 'someting'));
    });

    app.post('/app/authenticate', function(req,res){

        let email = req.body.email;
        let password = req.body.password;

        User.findOne({email : email}, function(err, data){
            if(err || data == null){
                console.log(data);
                return res.json({status : 'failure', message : 'Vigane kasutajanimi või parool!'});
            }

            data.checkPassword(password, function(err, correct){
                if(!correct){
                    return res.send({sucess : 'failure', message : 'Vale parool!'});
                }
                else{
                    res.send({status : 'ok', token : jwt.sign({lin : true, username: data.username}, 'provsecret')});
                }
            })
        });

    });



};

