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

gameSchema.post('findOneAndRemove', function(doc){
    playerGames.remove(
        {game_id : doc._id}
    ).exec(function(err, result){
    });
})

var Game = mongoose.model('games', gameSchema);




module.exports = Game;