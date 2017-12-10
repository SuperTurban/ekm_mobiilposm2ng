var mongoose = require("mongoose");

var mediaSchema = mongoose.Schema({
    path     : {type:String},
    mediaType : {type : String},
    name : {type : String},
},
{
    timestamps : {
        createdAt : 'created_at',
        updated   : 'updated_at',
    },
});

var media = mongoose.model('media', mediaSchema);

//Check if given player is in given game

//get game score

module.exports = media;