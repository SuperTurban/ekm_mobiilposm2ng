var mongoose = require("mongoose");

var media = {
    type : String, // (audio or image)
    name : String, // (audio or image) 
    file_loc : String,
}

var destinationSchema = mongoose.Schema({
    name        :   String,
    description :   String,
    files       :   [{name}],
    coords      : {
        lat : Number,
        long: Number,
    },
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