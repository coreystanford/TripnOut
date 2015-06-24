tripnoutApp.controller('singletutorialController', function($rootScope, $scope, $location, $stateParams, Auth, Trip, Tutorial, User) {

	  //get info if a person is logged in

    $scope.loggedIn = Auth.isLoggedIn();


    Tutorial.get($stateParams.tutorial_id)
    .success(function(data) {
      console.log(data);
      $scope.tutorial = data;
    });
    


});
