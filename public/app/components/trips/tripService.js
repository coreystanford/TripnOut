"use strict";

tripnoutApp.factory('Trip', function($http) {

	// create a new object
	var tripFactory = {};

	// get a single user
	tripFactory.get = function(id) {
	  return $http.get('/api/trips/' + id);
	};

	// get all users
	tripFactory.all = function() {
	  return $http.get('/api/trips/');
	};

	// create a user
	tripFactory.create = function(tripData) {
	  return $http.post('/api/trips/', tripData);
	};

	// update a user
	tripFactory.update = function(id, tripData) {
	  return $http.put('/api/trips/' + id, tripData);
	};

	// delete a user
	tripFactory.delete = function(id) {
	  return $http.delete('/api/trips/' + id);
	};

	// return entire userFactory object
	return tripFactory;

});