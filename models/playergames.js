var mongoose = require("mongoose");
var destinations = require('./destination.js');

var destinationWrap = {
    _id : mongoose.Schema.Types.ObjectId,
    score : Number,
    ref : 'destination'
}

var playergamesSchema = mongoose.Schema({
    user_id     :   String,
    game_id     :   String,
    destinations:  [destinationWrap],
    active      :   Boolean,
},
{
    timestamps : {
        createdAt : 'created_at',
        updated   : 'updated_at',
    },
});
playergamesSchema.statics.isUserInGame = function(user_id, game_id, cb){
    this.find({user_id, game_id},function(err, docs){
        if(err)
            return cb(null, null);

        if(docs.size == 0)
            cb(null, false);
        else
            cb(null, true);
    });
};

/**
 * Add given destination to given user in given game
 */
playergamesSchema.methods.addDestinationToUser = function(destination_id, score, cb){
    if(this.userHasDestination(destination_id))
        return cb('User already in game', null);

    let dest = {score, destination_id};
    this.destinations.push(dest);
    this.save(cb);
}

/**
 * Check if user has given destination
 */
playergamesSchema.methods.userHasDestination = function(destination_id){
    console.log(destination_id);
    let dest = this.destinations.filter(function(elem){
        console.log(elem.destination_id);
        return elem.destination_id == destination_id;
    });
    console.log(dest);
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

//get game score

module.exports = playerGames;