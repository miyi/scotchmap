// Pulls Mongoose dependency for creating schemas
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create schema
var UserSchema = new Schema({
    username: {type: String, require: true},
    gender: {type: String, require: true},
    age: {type: Number, require: true},
    favlang: {type: String, require: true},
    location: {type: [Number], require: true}, // Mongo requires [long,lat] but google requires lat,long ***remember
    htmlverified: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}

});



// Sets the created_at parameter equal to the current time

UserSchema.pre('save', function(next) {
    now = new Date;
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

UserSchema.index({location: '2dsphere'});
module.exports = mongoose.model('Scotch-user', UserSchema);

