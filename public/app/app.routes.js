"use strict";

tripnoutApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/components/home/home.html', 
            controller: 'homeController'
        });

    $urlRouterProvider.otherwise('/');
    //$locationProvider.html5Mode(true);

}]);