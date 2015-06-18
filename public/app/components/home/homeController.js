"use strict";

tripnoutApp.controller('homeController', function($scope, Trip) {

    $scope.processing = true;

    var offset = 0;
    var run = 1;
    var limit = 5;

    Trip.latest(limit, offset)
    .success(function(data) {
      $scope.processing = false;
      console.log(data);
      $scope.trips = data;
    });

    $scope.loadMore = function(){
    	run++;
    	offset = (run * limit) - run;

    	Trip.latest(limit, offset)
	    .success(function(data) {
	      $scope.processing = false;
	      console.log(data);
	      $scope.trips += data;
	    });
    };

});