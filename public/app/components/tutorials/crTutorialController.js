tripnoutApp.controller('crTutorialController', function($rootScope, $scope, $location, $stateParams, Auth) {

	  //get info if a person is logged in
  	$scope.loggedIn = Auth.isLoggedIn();

  	Auth.getUser()
    .success(function(data) {

      $scope.userTrips = data.trips;

    });

});