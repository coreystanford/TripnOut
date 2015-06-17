// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema 
var TutorialSchema   = new Schema({
	title: String,
    description: String,
    participants: Number,
    trip_link: String,
    content: [{
    	type: String,
        data: [{
            title: String,
            input: String
        }]
    }],
    author: { type: Schema.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    approved: Boolean
});

// return the model
module.exports = mongoose.model('Tutorial', TutorialSchema);