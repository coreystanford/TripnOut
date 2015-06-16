// https://scotch.io/tutorials/angularjs-best-practices-directory-structure
"use strict";

var tripnoutApp = angular.module('tripnoutApp', ['ui.router']);

tripnoutApp.run([ '$rootScope', 'Auth',function($rootScope, Auth){
	
	//check to see if a user is logged in on every request
    $rootScope.$on('$routeChangeStart', function() {
      $scope.loggedIn = Auth.isLoggedIn();

      //get user information on route change
      Auth.getUser()
        .success(function(data) {
          $scope.user = data;
        });
    });

}]);