var mongoose = require("mongoose");

var destinationSchema = mongoose.Schema({
    name        :   String,
    description :   String,
    media       :   [{type : mongoose.Schema.Types.ObjectId, ref: 'media'}],
    information :   String,
    coords      : {
        lat : Number,
        long: Number,
    },
    question    :   String,
    answer      :   String,
},
{
    timestamps : {
        createdAt : 'created_at',
        updated   : 'updated_at',
    },
});



var Model = mongoose.model('destinations', destinationSchema);

module.exports = Model;