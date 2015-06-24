tripnoutApp.controller('tutorialController', function($rootScope, $scope, $location, $stateParams, Auth, Trip, Tutorial, User) {

	  //get info if a person is logged in

    $scope.loggedIn = Auth.isLoggedIn();



        Tutorial.allWithAuthor()
        .success(function(data) {
          console.log(data);
          $scope.allTutorials = data;
        });




});
