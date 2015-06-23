"use strict";

tripnoutApp.controller('homeController', function($scope, $state, Trip, Search) {

    $scope.processing = true;
    $scope.load = true;

    var offset = 0;
    var run = 1;
    var limit = 5;

    Trip.latest(limit, offset)
    .success(function(data) {
      $scope.processing = false;
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
		      };
		      $scope.processing = false;
		  } else {
		  	$scope.load = false;
		  	$scope.processing = false;
		  }
	      
	    });
    };

    $scope.goSearch = function(qu){
        
        $state.go('search', {query: qu});

    };

});