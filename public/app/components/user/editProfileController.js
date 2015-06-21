"use strict";

//controller applied to user edit page
tripnoutApp.controller('editProfileController', function($scope, $state, User) {

  //variable to hide/show elements of the view
  //differentiates between create or edit pages
  $scope.type = 'edit';
  $scope.process = false;
  //get the user data for the user you want to edit
  //$routeParams is the waywe grab data from the url

  User.me().success(function(data){
    $scope.me = data;
  })

  User.me()
    .success(function(data) {
      $scope.processing = false;

      //clear the form
      $scope.userData = data;
    });

  $scope.saveUser = function()  {
    $scope.processing = true;

    //clear the message
    $scope.message = '';

    //use the create function in the userService
    User.update($scope.userData._id, $scope.userData)
      .success(function(data) {
        $scope.processing = false;

        //clear the form
        $scope.userData = {};
        $scope.message = data.message;
        $scope.success = true;
        $state.go('profile');
      });

  };

  $scope.preImage = function() {

  }

});