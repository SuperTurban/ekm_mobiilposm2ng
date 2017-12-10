const base_path = '/app/user';

var jwt = require('jsonwebtoken');

var User = require('./../models/user.js');
var PlayerGames = require('./../models/playergames.js');

let bcrypt = require('bcrypt');

module.exports = function(app){

    app.get(base_path + '/maketestadminuser', function(req,res){
        bcrypt.hash('testpassword', 10)
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

   //register new mobile app user
   // POST /app/user/register
   // request body {username, email}
   // responds with created user creds, if successfult
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
				//console.log(data._id);
                res.json({
                    status : 'ok',
                    username : data.username,
                    email : data.email,
                    uid : data._id,
                });
            }
        })
    });
	
	// Get all app users (all users where "admin" = "false")
	// GET /app/user/all
	// response: {status: ok, users: [...]}
	app.get(base_path + '/all', function(req, res) {
		
		User.find({admin : 0}, function(err, users) {
			if (err) {
				res.json({status : 'failure'})
			}
			console.log(users);
		});
		return res.json({status : 'ok', users});
	});

    // Insert mobile app user into a game
    // POST /app/user/:USER_ID/game/:GAME_ID
    // responds {status : ok}, if successful

    app.post(base_path + '/:user_id/game/:game_id', function(req,res){
        let user_id = req.params.user_id;
        let game_id = req.params.game_id;
        
        PlayerGames.isUserInGame(user_id, game_id,function(err, isInGame){
            if(isInGame)
                return res.json({status : 'failure', message : 'User already in game!'});
            else{
                let PG = new PlayerGames({
                    user_id,
                    game_id,
                    destinations : [],
                });

                PG.save(function(err, d){
                    if(err)
                        return console.log(err);
                    
                    return res.json({status : 'ok'});
                });
            }
        });
    });

    // Get all player games
    // GET /app/user/:USER_ID/game
    app.get(base_path + '/:user_id/game', function(req,res){
        let user_id = req.params.user_id;

        PlayerGames.findAllUserGames(user_id, function(err, games){
            if(err)
                return res.json({status : 'failure'});
            else
                return res.json({status : 'ok', games});
        });

    });

    // Add destination to player game (when
    //  player has completed destination) 
    //POST /app/user/:USER_ID/game/:GAME_ID
    //request body {destination_id, score}
    app.post(base_path + '/:user_id/game/:game_id/destination', function(req,res){

        let user_id = req.params.user_id;
        let game_id = req.params.game_id;
        let destination_id = req.body.destination_id;
        let score = req.body.score;
<<<<<<< HEAD
        PlayerGames.findOne({user_id, game_id}, function(err, PG){

            PG.addDestinationToUser(destination_id, score, function(err, docs){
=======

        if(!user_id || destination_id == "undefined" || destination_id == false || user_id == "undefined")
            return res.json({status:'failure', message : 'No user or destination'});

        PlayerGames.findOne({user_id, game_id}, function(err, PG){
            if(err)
                return res.json({status : 'failure'});
            PG.addDestinationToUser(destination_id, 0, function(err, docs){
>>>>>>> bfbd78c34751494c007c7d8da4913fd14c922a2d
                if(err){
                    res.json({status : 'failure', message : err})
                }
                else
                    res.json({status : 'ok'});
            })
        });

    });

    //get all given player(user_id) given game (game_id) completed destinations
    //GET /app/user/:USER_ID/game/:GAME_ID/destination
    //response {status: ok, destinations}, if successful
    app.get(base_path + '/:user_id/game/:game_id/destination', function(req,res){
        let user_id = req.params.user_id;
        let game_id = req.params.game_id;

        PlayerGames
            .findOne({user_id, game_id})
            .populate('destinations._id')
            .exec(function(err, PG){
             if(err || !PG){
                 console.log(err)
                 return res.json({status : 'failure'});
             }
			console.log(PG);
            return res.json({status : 'ok', destinations : PG.destinations}) 
            })
    });

    


};