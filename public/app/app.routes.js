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

        .state('profile', {
          url: '/me',
          templateUrl: 'static/app/components/user/profile.html',
          controller: 'userController'
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
          templateUrl: 'static/app/components/trips/views/trip.html',
          controller: 'tripController'
        })

        // ---- Admin Trip Routes ---- //

        .state('my-trips', {
          url: '/users/:user_id/trips',
          templateUrl: 'static/app/components/trips/views/my-trips.html',
          controller: 'crTripController'
        })

        .state('create-my-trip', {
          url: '/users/:user_id/trips/create',
          templateUrl: 'static/app/components/trips/views/create.html',
          controller: 'crTripController'
        })

        .state('update-my-trip', {
          url: '/users/:user_id/trips/update/:trip_id',
          templateUrl: 'static/app/components/trips/views/update.html',
          controller: 'udTripController'
        })

        .state('delete-my-trip', {
          url: '/users/:user_id/trips/delete/:trip_id',
          templateUrl: 'static/app/components/trips/views/delete.html',
          controller: 'udTripController'
        })
        .state('main-tutorials', {
            url: '/tutorials',
            templateUrl: 'static/app/components/tutorials/views/main-tutorials.html',
            controller: 'tutorialController'
        })
     .state('create-tutorial', {
            url: '/create-tutorial',
            templateUrl: 'static/app/components/tutorials/views/create-tutorial.html',
            controller: ''
        });

    // Default route
    $urlRouterProvider.otherwise('/');

    // Remove the hashtag in the url
    $locationProvider.html5Mode(true);

    // Check for token on any request for express.js Middleware (api.js)
    $httpProvider.interceptors.push('AuthInterceptor');

}]);
