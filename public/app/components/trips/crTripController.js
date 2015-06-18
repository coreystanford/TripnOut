tripnoutApp.controller('crTripController', function($rootScope, $scope, $location, $stateParams, Auth, User) {

	  //get info if a person is logged in
  	$scope.loggedIn = Auth.isLoggedIn();

  	$scope.user_id = $stateParams.user_id;
  	$scope.displayButton = true;


  	User.get($stateParams.user_id)
    .success(function(data) {

      console.log(data.trips);
      $scope.trips = data.trips;

    });

    $scope.showOptions = function(){

    	if($scope.displayButton){
    		$scope.displayButton = false;
    	} else {
    		$scope.displayButton = true;
    	}

    	

    };

    $scope.createTrip = function(){

    	

    };

});