var mongoose = require("mongoose");
var destinations = require('./destination.js');

var destinationWrap = new mongoose.Schema({
    destination : {type :mongoose.Schema.Types.ObjectId, ref:'destinations'},
    score : Number,
},
{
	timestamps : {
		completedAt : 'completed_at'
	}
});

var playergamesSchema = mongoose.Schema({
    user_id     :   {type:String, ref : 'users'},
    game_id     :   {type:String, ref : 'games'},
    destinations:  [destinationWrap],
},
{
    timestamps : {
        createdAt : 'created_at',
        updated   : 'updated_at',
    },
});

playergamesSchema.statics.isUserInGame = function(user_id, game_id, cb){
    this.find({user_id, game_id},function(err, docs){
        if(err){
            return cb(err, null);
        }

        if(docs.length == 0)
            cb(null, false);
        else
            cb(null, true);
    });
};

/**
 * Find all games that user is in
 */
playergamesSchema.statics.findAllUserGames = function(user_id, cb){
    this.find({user_id}).populate('game_id').exec(function(err, docs){
        if(err){
            console.log(err);
            return cb(err, null);
        }

        let games = docs.map(elem => elem.game_id)

        cb(null, games);
    });
};

/**
 * Add given destination to given user in given game
 */
playergamesSchema.methods.addDestinationToUser = function(destination_id, score, cb){
    if(this.userHasDestination(destination_id))
        return cb('User already has destination', null);

    let dest = {score, destination : destination_id};
    this.destinations.push(dest);
    this.update({})
    console.log(this.destinations);
    this.save(cb);
}

/**
 * Check if user has given destination
 */
playergamesSchema.methods.userHasDestination = function(destination_id){
    let dest = this.destinations.filter(function(elem){
        return elem.destination == destination_id;
    });
    return Boolean(dest.length); 
}


/**
 * Find player game score
 */
playergamesSchema.methods.findPlayerGameScore = function(){
    return this.destinations.reduce(function(total, elem){
        return total + elem.score;
    },0);
}

var playerGames = mongoose.model('playergames', playergamesSchema);

//Check if given player is in given game


module.exports = playerGames;