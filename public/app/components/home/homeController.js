"use strict";

tripnoutApp.controller('homeController', function($scope, Trip) {

    $scope.processing = true;
    $scope.load = true;

    var offset = 0;
    var run = 1;
    var limit = 1;

    Trip.latest(limit, offset)
    .success(function(data) {
      $scope.processing = false;
      console.log(data);
      $scope.trips = data;
    });

    $scope.loadMore = function(){
    	run++;
    	offset = (run * limit) - limit;

    	Trip.latest(limit, offset)
	    .success(function(data) {
	     
	      if(data.length){
		      for (var i = 0; i < data.length; i++) {
		      	$scope.trips.push(data[i]);
		      	console.log(data[i]);
		      };
		      $scope.processing = false;
		  } else {
		  	$scope.load = false;
		  	$scope.processing = false;
		  }
	      
	    });
    };

});