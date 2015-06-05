// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema 
var TutorialSchema   = new Schema({
	title: String,
    description: String,
    content: Array,
    approved: Boolean
});

// return the model
module.exports = mongoose.model('Tutorial', TutorialSchema);