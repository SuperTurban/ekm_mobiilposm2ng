var User = require('./models/user.js');
var Game = require('./models/game.js');
var Destination = require('./models/destination.js');

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
	
	// add destination point 1
	let destination0 = new Destination({
		name : "test point 0",
		description : "for automated tests",
		coords : {
			lat : 69,
			long : 70,
		}
	});
	
	Destination.find(
		{ name : "test point 0", description : "for automated tests"},
		function(err, res) {
			if (res.length  == 0) {
				destination0.save(function(err, r){
					if (err) {
						console.log(err);
					}
					console.log('Destination point created.');
				});
			}
		}
	);
	
	// add destination point 2
	let destination1 = new Destination({
		name : "test point 1",
		description : "for automated tests",
		coords : {
			lat : 34,
			long : 98,
		}
	});
	
	Destination.find(
		{ name : "test point 1", description : "for automated tests"},
		function(err, res) {
			if (res.length  == 0) {
				destination1.save(function(err, r){
					if (err) {
						console.log(err);
					}
					console.log('Destination point created.');
				});
			}
		}
	);
	
	Destination.findOne(
		{ name : "test point 0"},
		function(err, res) {
			return res;
		}).then(function(res) {
			let game = new Game({
				name: "test game 0", 
				description : "for automated tests", 
				destinations: [res._id], 
				active : 1, 
			});
			
			game.save(function(err, r) {
				if (err) {
					console.log(err);
				}
				console.log('Game created.');
			});
		});
	

});



