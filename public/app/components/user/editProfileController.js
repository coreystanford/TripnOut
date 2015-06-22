"use strict";

//controller applied to user edit page
tripnoutApp.controller('editProfileController', function($scope, $state, User) {

  //variable to hide/show elements of the view
  //differentiates between create or edit pages
  $scope.type = 'edit';
  $scope.process = false;
  //get the user data for the user you want to edit
  //$routeParams is the waywe grab data from the url

  $scope.imgBool = false;
  $scope.imgConfirm = 'Cancel';
  $scope.changeImg = function() {
    if ($scope.imgBool){
      $scope.imgBool = false;
      $scope.imgConfirm = 'Cancel';
    }
    else {
      $scope.imgBool = true;
    }
  }

  

  User.me().success(function(data){
    $scope.me = data;
    if (!data.pic || data.pic == ""){
      $scope.img = '/static/assets/img/default_profile_small.png';
    } else {
      $scope.img = '/static/assets/img/profile/' + data.pic;
    }
  })

  User.me()
    .success(function(data) {
      $scope.processing = false;

      //clear the form
      $scope.userData = data;
    });

  $scope.onUpload = function($flow) {
    $scope.me.pic = $flow.files[0].name;
    $scope.img = '/static/assets/img/profile/' + $scope.me.pic;
    $scope.userData.pic = $flow.files[0].name;
    $scope.saveUser();
    $flow.upload();
    $scope.imgConfirm = "OK";
  }

  $scope.saveUser = function()  {
    $scope.processing = true;
    //clear the message
    $scope.message = '';

    //use the create function in the userService
    User.update($scope.userData._id, $scope.userData)
      .success(function(data) {
        $scope.processing = false;

        $scope.success = true;
        $scope.me.name = $scope.userData.name;
      });

  };

});