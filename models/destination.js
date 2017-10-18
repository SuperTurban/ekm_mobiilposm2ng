var mongoose = require("mongoose");

var media = {
    type : String, // (audio or image)
    name : String, // (audio or image) 
    file_loc : String,
}

var destinationSchema = mongoose.Schema({
    name        :   String,
    description :   String,
    media       :   String,
    coords      : {
        lat : Number,
        long: Number,
    },
    question    :   String,
    answer      :   String,
    destinations:  [mongoose.Schema.Types.ObjectId],
},
{
    timestamps : {
        createdAt : 'created_at',
        updated   : 'updated_at',
    },
});



var Model = mongoose.model('destinations', destinationSchema);

module.exports = Model;