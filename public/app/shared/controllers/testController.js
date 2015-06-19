
tripnoutApp.controller('testController', function($state, $location, Auth) {

  var vm = this;
  //menu boolean
  vm.menu = false;

  vm.showMain = function(){
    vm.menu = false;
  }

  //get info if a person is logged in
  vm.loggedIn = Auth.isLoggedIn();

    //function to handle login form
    vm.doLogin = function() {
      vm.processing = true;

      //clear the error
      vm.error = '';

      //call the Auth.login() function
      Auth.login(vm.loginData.username, vm.loginData.password)
        .success(function(data)   {
          vm.processing = false;

          //if a user successfully logs in, redirect to users page
          if(data.success)
          {
            vm.loggedIn = Auth.isLoggedIn();
            $state.go('profile');
          }
          else
            vm.error = data.message;
        });
        
    };

    //function to handle logging out
    vm.doLogout = function()  {
      Auth.logout();
      //reset all user info
      vm.user = {};
      vm.loggedIn = Auth.isLoggedIn();
      vm.showMain();
      $state.go('home');
    };

});
