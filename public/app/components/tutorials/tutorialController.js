tripnoutApp.controller('tutorialController', function($rootScope, $scope, $location, $stateParams, Auth, Trip, Tutorial) {

	  //get info if a person is logged in
  	
    $scope.loggedIn = Auth.isLoggedIn();


});