"use strict";

tripnoutApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'static/app/components/home/home.html',
            controller: 'homeController'
        })

        .state('login', {
          url: '/login',
          templateUrl: 'static/app/components/login/login.html',
          controller: 'mainController'
        })

        .state('create', {
          url: '/user/create',
          templateUrl: 'static/app/components/login/login.html',
          controller: 'userCreateController'
        })

        .state('user', {
          url: '/users/:user_id',
          templateUrl: 'static/app/components/login/single.html',
          controller: 'userEditController'
        })

        .state('trips', {
          url: '/users/:user_id/trips',
          templateUrl: 'static/app/components/trips/single.trips.html',
          controller: 'tripController'
        })
        
        .state('trips-create', {
          url: '/users/:user_id/trips/create',
          templateUrl: 'static/app/components/trips/single.trips.create.html',
          controller: 'tripController'
        });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push('AuthInterceptor');

}]);
