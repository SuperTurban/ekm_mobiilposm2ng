var mongoose = require("mongoose");
var Game = require("./game");
var playerGames = require("./playergames");

var questionSchema = new mongoose.Schema({
    question : String,
    choice1  : String,
    choice2  : String,
    choice3  : String,
    answer  : String,
    type : String
});

var destinationSchema = mongoose.Schema({
    name        :   String,
    description :   String,
    media       :   [{type : mongoose.Schema.Types.ObjectId, ref: 'media'}],
    information :   String,
    coords      : {
        lat : Number,
        long: Number,
    },
    question    :   questionSchema,
},
{
    timestamps : {
        createdAt : 'created_at',
        updated   : 'updated_at',
    },
});


destinationSchema.post('findOneAndRemove', function(doc){
    Game.update(
        {},
        {$pull : {destinations : doc._id}},
        {multi : true}
    ).exec(function(err, result){
        console.log(result);
    });

    playerGames.update(
        {},
        {$pull : {destinations : {destination : doc._id}}},
        {multi : true}
    ).exec(function(err, result){
        console.log(result);
    });
})


var Model = mongoose.model('destinations', destinationSchema);

module.exports = Model;