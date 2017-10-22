let jwt = require('jsonwebtoken');

module.exports.checkAdmin = function(req,res,next){

    let token = req.body.token;
    jwt.verify(token, 'provsecret', function(err, data){
        if(err){
            res.status(401);
            return res.send({status : 'failure', message : 'Credentials missing!'})
        }
        else{
            return next();
        } 
    });
}

