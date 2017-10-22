var mongoose = require("mongoose");
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
    username    :   String,
    email       :   {type : String, index: true, unique: true},
    password    :   String,
    admin       :   Boolean,
},
{
    timestamps : {
        createdAt : 'created_at',
        updated   : 'updated_at',
    },
});

userSchema.methods.checkPassword = function(password, cb){
    console.log(password);
    return bcrypt.compare(password, this.password, cb);
}

var User = mongoose.model('users', userSchema);

module.exports = User;