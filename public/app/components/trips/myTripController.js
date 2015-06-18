tripnoutApp.controller('myTripController', function($rootScope, $scope, $location, $stateParams, Auth, User) {

	  //get info if a person is logged in
  	$scope.loggedIn = Auth.isLoggedIn();

  	User.get($stateParams.user_id)
    .success(function(data) {

      console.log(data.trips);
      $scope.trips = data.trips;

    });

});