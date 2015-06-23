"use strict";

tripnoutApp.factory('Tutorial', function($http) {

	// create a new object
	var tutorialFactory = {};

    // get all tutorials
	tripFactory.all = function() {
	  return $http.get('/api/tutorials/');
	};
    
	// get a single tutorial
	tripFactory.get = function(id) {
	  return $http.get('/api/tutorials/' + id);
	};	

	// create a user
	tripFactory.create = function(tutorialData) {
	  return $http.post('/api/tutorials/', tutorialData);
	};

	// update a user
	tripFactory.update = function(tutorial_id, user_id, tutorialData) {
	  return $http.put('/api/trips/' + tutorial_id + '/' + user_id, tutorialData);
	};

	// delete a user
	tripFactory.delete = function(tutorial_id, user_id) {
	  return $http.delete('/api/trips/' + trip_id + '/' + user_id);
	};

	// return entire userFactory object
	return tripFactory;

});

