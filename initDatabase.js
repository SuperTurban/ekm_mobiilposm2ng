var User = require('./models/user.js');
var bcrypt = require('bcrypt');

var mongoose = require('mongoose');

require('dotenv').load();
mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;

//create user to run tests

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    let password = bcrypt.hash('testpassword', 10)
    .then(function(hash){

        let user = new User({
            username : 'ekmadmin',
            password : hash,
            admin : 1,
            email : 'admin@localhost'
        })

        user.save(function(err, r){
            if(err){
                console.log('User existing');
                process.exit();
            }
            else{
                console.log('User created');
                process.exit();
            }
        })
    });
});



