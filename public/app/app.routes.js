"use strict";

tripnoutApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $stateProvider

        // ---- Homepage Route ---- //

        .state('home', {
            url: '/',
            templateUrl: 'static/app/components/home/home.html',
            controller: 'homeController'
        })

        // ---- Login / Registration Routes ---- //

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

        // ---- Public Trip Routes ---- //

        .state('trip', {
          url: '/trip/:trip_id',
          templateUrl: 'static/app/components/trips/trip.html',
          controller: 'tripController'
        })

        // ---- Admin Trip Routes ---- //

        .state('my-trips', {
          url: '/users/:user_id/trips',
          templateUrl: 'static/app/components/trips/my-trips.html',
          controller: 'myTripController'
        })
        
        .state('create-my-trip', {
          url: '/users/:user_id/trips/create',
          templateUrl: 'static/app/components/trips/create.html',
          controller: 'myTripController'
        })

        .state('update-my-trip', {
          url: '/users/:user_id/trips/create',
          templateUrl: 'static/app/components/trips/update.html',
          controller: 'myTripController'
        })

        .state('delete-my-trip', {
          url: '/users/:user_id/trips/create',
          templateUrl: 'static/app/components/trips/delete.html',
          controller: 'myTripController'
        });

    // Default route
    $urlRouterProvider.otherwise('/');

    // Remove the hashtag in the url
    $locationProvider.html5Mode(true);

    // Check for token on any request for express.js Middleware (api.js)
    $httpProvider.interceptors.push('AuthInterceptor');

}]);
