var mongoose = require("mongoose");

var gameSchema = mongoose.Schema({
    name        :   String,
    description :   String,
    destinations:  [mongoose.Schema.Types.ObjectId],
},
{
    timestamps : {
        createdAt : 'created_at',
        updated   : 'updated_at',
    },
});

var Game = mongoose.model('games', gameSchema);

module.exports = Game;