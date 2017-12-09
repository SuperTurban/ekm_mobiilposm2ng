var mongoose = require("mongoose");
var playerGames = require("./playergames");

var gameSchema = mongoose.Schema({
    name        :   String,
    description :   String,
    destinations:  [mongoose.Schema.Types.ObjectId],
    active      :   Boolean,
    gameColor   :   String,
},
{
    timestamps : {
        createdAt : 'created_at',
        updated   : 'updated_at',
    },
});

gameSchema.pre('findOneAndRemove', function(next){
    playerGames.remove(
        {game_id : this._id}
    ).exec();

    next();
})

var Game = mongoose.model('games', gameSchema);




module.exports = Game;