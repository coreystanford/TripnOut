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
	tripFactory.create = function(userData) {
	  return $http.post('/api/trips/', userData);
	};

	// update a user
	tripFactory.update = function(id, userData) {
	  return $http.put('/api/trips/' + id, userData);
	};

	// delete a user
	tripFactory.delete = function(id) {
	  return $http.delete('/api/trips/' + id);
	};

	// return entire userFactory object
	return tripFactory;

});