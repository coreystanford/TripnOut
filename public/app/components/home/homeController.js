"use strict";

tripnoutApp.controller('homeController', function($scope) {

    // define a basic variable
    $scope.message = 'Hey there! Come and see how good I look!';

    // define a list of items
    $scope.computers = [
        { name: 'Macbook Pro', color: 'Silver', nerdness: 7 },
        { name: 'Yoga 2 Pro', color: 'Gray', nerdness: 6 },
        { name: 'Chromebook', color: 'Black', nerdness: 5 }
    ];

});