const base_path = '/app/leaderboards';

var jwt = require('jsonwebtoken');

var mongoose = require("mongoose");

var User = require('./../models/user.js');
var PlayerGames = require('./../models/playergames.js');

module.exports = function(app){
	
   // get a leaderboard throughout all games
   // GET /app/leaderboards/all_games_scores
   // response: {status, players: [{user_id, username, score}, ...]}
   app.get(base_path + '/all', function(req, res) {

		PlayerGames.aggregate(
			{
				$lookup : {
					from : "users",
					localField : "user_id",
					foreignField : "_id",
					as : "user"
				}
			},
			{
				$unwind : "$user"
			},
			{
				$unwind : "$destinations"
			},
			{
				$lookup : {
					from : "destinations",
					localField : "destinations",
					foreignField : "_id",
					as : "destination"
				}
			},
			{
				$group : {
					_id : "$user_id",
					score : { $sum : "$destinations.score" },
					username : { $first : "$user.username" }
					}
			},
			{
				$sort : {
					score : -1
				}
			},
			function(err, players) {
				if (err) {
					res.send({status : '400'});
				}
				else {
					console.log(players);
					res.send({status : 'ok', players : players});					}
			})
   });
   
   // get a leaderboard for a certain game(game_id)
   // GET /app/leaderboards/:game_id/scores
   // response: {status, players : [{user_id, username, score}, ...]}
   
	app.get(base_path + '/:game_id', function(req, res) {
		
		let gameId = req.params.game_id;
		
		PlayerGames.aggregate(
				{
					$match : { game_id : new mongoose.Types.ObjectId(gameId) }
				},
				{
					$lookup : {
						from : "users",
						localField : "user_id",
						foreignField : "_id",
						as : "user"
					}
				},
				{
					$unwind : "$user"
				},
				{
					$unwind : "$destinations"
				},
				{
					$lookup : {
						from : "destinations",
						localField : "destinations",
						foreignField : "_id",
						as : "destination"
					}
				},
				{
					$group : {
						_id : "$user_id",
						score : { $sum : "$destinations.score" },
						username : { $first : "$user.username" }
						}
				},
				{
					$sort : {
						score : -1
					}
				},
				function(err, players) {
					if (err) {
						res.send({status : '400'});
					}
					else {
						console.log(players);
						res.send({status : 'ok', players : players});
					}
				})
	   	   	   
	});
   
   // get scores in all games for a user
   // GET /app/leaderboards/:user_id/scores
   // 
   app.get(base_path + '/:user_id/scores', function(req, res) {
	   
	   let user_id = req.params.user_id;
	   
	   
   });
	
};