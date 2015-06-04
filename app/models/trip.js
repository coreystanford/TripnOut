// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema 
var TripSchema   = new Schema({
	title: String,
    description: Text,
    content: Array,
    privacy: Boolean
});

// return the model

module.exports = mongoose.model('Trip', TripSchema);
