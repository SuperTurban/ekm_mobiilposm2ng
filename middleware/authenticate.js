let jwt = require('jsonwebtoken');

module.exports.checkAdmin = function(req,res,next){
    let token = req.body.token;

    jwt.verify(token, 'provsecret', function(err, data){
        if(err)
            return res.send({status : 'failure', message : 'Credentialss are missing!'})

        next(req,res);
    });

}

module.exports.checkUser = function(req,res,next){

}

