// https://scotch.io/tutorials/angularjs-best-practices-directory-structure
// Angular UI Router - https://github.com/angular-ui/ui-router
// Flow - https://github.com/flowjs/ng-flow



"use strict";

var tripnoutApp = angular.module('tripnoutApp', ['ui.router', 'ngAnimate', 'flow']);

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
