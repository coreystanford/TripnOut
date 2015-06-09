"use strict";




tripnoutApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/components/home/home.html',
            controller: 'homeController'
        })

        .state('login', {
          url: '/login',
          templateUrl: 'app/components/login/login.html',
          controller: 'mainController'
        })

        .state('create', {
          url: '/user/create',
          templateUrl: 'app/components/login/login.html',
          controller: 'userCreateController'
        })

        .state('user', {
          url: '/users/:user_id',
          templateUrl: 'app/components/login/single.html',
          controller: 'userEditController'
        });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

}]);
