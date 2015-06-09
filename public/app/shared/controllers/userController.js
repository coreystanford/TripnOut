

//user controller for the main page
//inject the User factory
tripinoutApp.controller('userController', function(User){


  //set a processing variable to show loading things
  $scope.processing = true;

  //grab all the users at page locationProvider
  User.all()
      .success(function(data) {

        //when all the users come back, remove the processing variable
        $scope.processing = false;

        //bind the users that come back to $scope.users
        $scope.users = data;
      });


      //function to delete a user
      $scope.deleteUser = function(id){
        $scope.processing = true;

        //accepts the user id as a paramets
        User.delete(id) {
          .success(function(data) {

            //get all users to update the table
            //you can also set up your api
            //to return the list of users with the delete call
            User.all()
              .success(function(data){
                $scope.processing = false;
                $scope.users = data;
              });

          });
        };

        // controller applied to user creation page
        .controller('userCreateController', function(User){

          var $scope = this;

          //variable to hide/show elements of the views
          //differentiates between create or edit pages
          $scope.type = 'create';

          //function to create a user
          $scope.saveUser = function()  {
            $scope.processing = true;

            //clear the message
            $scope.message = '';

            //use the create function in the userService
            User.create($scope.userData)
              .success(function(data) {
                $scope.processing = false;

                //clear the form
                $scope.userData = {};
                $scope.message = data.message;
              });

          };

        });

      }

      //controller applied to user edit page
      .controller('userEditController', function($routeParams, User) {

        var $scope = this;

        //variable to hide/show elements of the view
        //differentiates between create or edit pages
        $scope.type = 'edit';

        //get the user data for the user you want to edit
        //$routeParams is the waywe grab data from the url
        User.get($routeParams.user_id)
          .success(function(data) {
            $scope.processing = false;

            //clear the form
            $scope.userData = {};

            //bind the message from our API to $scope.message
            $scope.message = data.message;
          });
        };

      });

})
