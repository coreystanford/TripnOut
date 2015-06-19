tripnoutApp.controller('crTripController', function($rootScope, $scope, $state, $stateParams, Auth, User, Trip) {

	  //get info if a person is logged in
  	$scope.loggedIn = Auth.isLoggedIn();

	  //grab logged in user
    User.me().success(function(data){
      console.log(data);
      $scope.me = data;
      $scope.trips = data.trips;
    });

  	$scope.tripdata = {};
  	$scope.tripdata.content = new Array();
  	
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

    	$scope.tripdata.author = $scope.user_id;

    	Trip.create($scope.tripdata)
    	.success(function(response){
    		$scope.message = response;
    		$state.go('my-trips', {msg: response.message});
    	});

    };

});