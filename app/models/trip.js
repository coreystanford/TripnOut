// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Docs for referencing 'User._id' via 'TripSchma.auther'
// http://mongoosejs.com/docs/populate.html

// user schema 
var TripSchema   = new Schema({
	title: String,
    description: String,
    thumbnail: String,
    content: [{
    	type: String,
    	content: String
    }],
    author: { type: Schema.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    privacy: Boolean
});

// return the model
module.exports = mongoose.model('Trip', TripSchema);