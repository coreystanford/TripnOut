
tripnoutApp.controller('mainController', function($scope, $location, Auth) {

  //menu boolean
  $scope.menu = false;

  $scope.showMain = function(){
    $scope.menu = false;
  }

  //get info if a person is logged in
  $scope.loggedIn = Auth.isLoggedIn();

    //function to handle login form
    $scope.doLogin = function() {
      $scope.processing = true;

      //clear the error
      $scope.error = '';

      //call the Auth.login() function
      Auth.login($scope.loginData.username, $scope.loginData.password)
        .success(function(data)   {
          $scope.processing = false;

          //if a user successfully logs in, redirect to users page
          if(data.success)
          $location.path('/users/'+ data.id);
          else
            $scope.error = data.message;
        });
    };

    //function to handle logging out
    $scope.doLogout = function()  {
      Auth.logout();
      //reset all user info
      $scope.user = {};
      $location.path('/login');
    };

});
