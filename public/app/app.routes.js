"use strict";


angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){

  $routeProvider

  //home page routes
  .when('/', {
    templateUrl : 'app/views.pages.home.html'
  });

  //get rid of the hash in the url
  $locationProvider.html5Mode(true);

});

tripnoutApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/components/home/home.html',
            controller: 'homeController'
        });

    $urlRouterProvider.otherwise('/');
    //$locationProvider.html5Mode(true);

    //route for the home page
    .when('/', {
      templateUrl :'app/views/pages/home.html'})
    })

    //login page
    .when('/login', {
      templateUrl : 'app/views/pages/login.html',
      controller  'mainController',
      controllerAs: 'login'
    });

    //show all users
    .when('/users', {
      templateUrl: 'app/views/pages/users/all.html',
      controller: 'userController',
      controllerAs: 'user'
    });


    //form to create a new user
    //same view as edit page
    .when('/users/create', {
      templateUrl: 'app/views/pages/users/signle.html',
      controller: 'userCreateController',
      controllerAs: 'user'
    });

    //paGE TO EDIT A user
    .when('/users/:user_id', {
      templateUrl: 'app/views/pages/users/single.html',
      controller: 'userEditController',
      controllerAs: 'user'
    });

}]);
