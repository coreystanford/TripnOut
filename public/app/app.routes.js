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
          templateUrl: 'app/views/login.html',
          controller: 'mainController'
        })

        .state('create', {
          url: '/user/create',
          templateUrl: 'app/views/pages/login.html',
          controller: 'userCreateController'
        })

        .state('user', {
          url: '/users/:user_id',
          templateUrl: 'app/views/pages/users/single.html',
          controller: 'userEditController'
        });

    $urlRouterProvider.otherwise('/');
    //$locationProvider.html5Mode(true);

}]);
