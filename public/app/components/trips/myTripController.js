tripnoutApp.controller('myTripController', function($rootScope, $scope, $location, $stateParams, Auth, User) {

	  //get info if a person is logged in
    // !!!! is this set in rootScope??
  	$scope.loggedIn = Auth.isLoggedIn();

  	User.get($stateParams.user_id)
    .success(function(data) {
      $scope.processing = false;

      console.log(data);

      //clear the form
      $scope.userData = {};

      //bind the message from our API to $scope.message
      $scope.message = data.message;
    });

});