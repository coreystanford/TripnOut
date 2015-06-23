
tripnoutApp.controller('testController', function($state, $location, Auth, User) {

  var vm = this;
  //menu boolean
  vm.menu = false;

  vm.showMain = function(){
    vm.menu = false;
  }

  //get info if a person is logged in
  vm.loggedIn = Auth.isLoggedIn();

    //get logged in user info
    if(vm.loggedIn){
      User.me().success(function(data){
        vm.user = data;
      })
    };
    

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
            User.me().success(function(data){
              vm.user = data;
              vm.user.online = true;
              onlineStatus(vm.user);
            });
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
      onlineStatus(vm.user);
      vm.loggedIn = Auth.isLoggedIn();
      vm.showMain();
      $state.go('home');
    };

    var onlineStatus = function(user) {
      if(user.online == true){
        console.log('true');
      } else {
        console.log('not true');
      }
    }

});
