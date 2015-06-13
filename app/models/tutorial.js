// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema 
var TutorialSchema   = new Schema({
	title: String,
    description: String,
    participants: Number,
    story_link: String,
    content: [{
    	type: String,
        data: [{
            title: String,
            input: String
        }]
    }],
    author: { type: Number, ref: 'User' },
    date: Date,
    approved: Boolean
});

// return the model
module.exports = mongoose.model('Tutorial', TutorialSchema);