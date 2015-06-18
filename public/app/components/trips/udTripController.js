tripnoutApp.controller('udTripController', function($rootScope, $scope, $location, $stateParams, Auth, User, Trip) {

	//get info if a person is logged in
  	$scope.loggedIn = Auth.isLoggedIn();

  	User.get($stateParams.user_id)
    .success(function(data) {

      console.log(data);
      $scope.user = data;

    });

    Trip.get($stateParams.trip_id)
    .success(function(data) {

      console.log(data);
      $scope.trip = data;

    });

});