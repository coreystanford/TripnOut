"use strict";
// http://ngmodules.org/modules/ng-flow
tripnoutApp.controller('crTripController', function($rootScope, $scope, $state, $stateParams, Auth, User, Trip) {

	  //get info if a person is logged in
  	$scope.loggedIn = Auth.isLoggedIn();

	  //grab logged in user
    User.me().success(function(data){
      $scope.me = data;
      $scope.trips = data.trips;
    });

  	$scope.tripdata = {};
  	$scope.tripdata.content = new Array();
  	
    $scope.textType = "text";
    $scope.imageType = "image";
    $scope.videoType = "video";

  	$scope.displayButton = true;

  	$scope.message = $stateParams.msg;

    $scope.showOptions = function(){

    	if($scope.displayButton){
    		$scope.displayButton = false;
    	} else {
    		$scope.displayButton = true;
    	}

    };

    $scope.createTrip = function(){

    	$scope.tripdata.author = $scope.me._id;

    	Trip.create($scope.tripdata)
    	.success(function(response){
    		$state.go('my-trips', {msg: response.message});
    	});

    };

});