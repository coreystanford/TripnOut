"use strict";

tripnoutApp.controller('homeController', function($scope, Trip) {

    $scope.processing = true;

    Trip.all()
    .success(function(data) {

      $scope.processing = false;
      console.log(data);
      $scope.trips = data;

    });

});