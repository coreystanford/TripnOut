"use strict";

tripnoutApp.factory('Tutorial', function($http) {

	// create a new object
	var tutorialFactory = {};

    // get all tutorials
	tutorialFactory.all = function() {
	  return $http.get('/api/tutorials/');
	};

	//get all the tutorials for an author
	tutorialFactory.allWithAuthor = function() {
		return $http.get('/api/tutorials/author');
	};

	// get a single tutorial
	tutorialFactory.get = function(id) {
	  return $http.get('/api/tutorials/' + id);
	};

	// create a user
	tutorialFactory.create = function(tutorialData) {
	  return $http.post('/api/tutorials/', tutorialData);
	};

	// update a user
	tutorialFactory.update = function(tutorial_id, user_id, tutorialData) {
	  return $http.put('/api/tutorials/' + tutorial_id + '/' + user_id, tutorialData);
	};

	// delete a user
	tutorialFactory.delete = function(tutorial_id, user_id) {
	  return $http.delete('/api/tutorials/' + tutorial_id + '/' + user_id);
	};

	// return entire userFactory object
	return tutorialFactory;

});
