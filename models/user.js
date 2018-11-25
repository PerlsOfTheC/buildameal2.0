const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const  config = require('../config/mongodb');

//User Schema
const  UserSchema = mongoose.Schema({
    fullname: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    // savedRecipes: [{
    //     type: String,
    // }]
});

const  User = module.exports = mongoose.model('User', UserSchema);

//gets user by ID
module.exports.getUserByID = function (id,callback) {
    User.findById(id,callback);
}

//gets user by  name
module.exports.getUserByUsername = function (username,callback) {
    const query = {username: username}
    User.findOne(query,callback);
}

module.exports.addUser = function (newUser, callback) {
    //hashed password.
    bcrypt.genSalt(10,(err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if( err ) throw  err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function (userPassword, hashPassword, callback ) {
    bcrypt.compare(userPassword, hashPassword, (err,isMatch) =>{
        if(err) throw err;
        callback(null,isMatch);
    });
}