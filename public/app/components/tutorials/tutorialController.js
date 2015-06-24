tripnoutApp.controller('tutorialController', function($rootScope, $scope, $location, $stateParams, Auth, Tutorial) {

	  //get info if a person is logged in
  	
    $scope.loggedIn = Auth.isLoggedIn();


});