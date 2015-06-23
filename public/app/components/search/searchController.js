"use strict";
// http://ngmodules.org/modules/ng-flow
tripnoutApp.controller('searchController', function($scope, $state, $stateParams, Search) {
  	
    $scope.query = $stateParams.query;

    if($stateParams.query){
      Search.query($scope.query)
        .success(function(response){
            $scope.results = response;
        });
    }

});