tripnoutApp.controller('udTripController', function($rootScope, $scope, $state, $stateParams, Auth, User, Trip) {

	//get info if a person is logged in
  	$scope.loggedIn = Auth.isLoggedIn();

    //grab logged in user
    User.me().success(function(data){
      console.log(data);
      $scope.me = data;
    });

    $scope.trip_id = $stateParams.trip_id;

    $scope.tripdata = {};

    Trip.get($stateParams.trip_id)
    .success(function(data) {
      $scope.trip = data;
    });

    $scope.deleteTrip = function(){
      Trip.delete($scope.trip_id, $scope.me._id).success(function(response){
        $scope.message = response;
        $state.go('my-trips', { msg: response.message});
      });
    };

    $scope.updateTrip = function(){
      Trip.update($scope.tripdata, $scope.me._id).success(function(response){
        $scope.message = response;
        $state.go('my-trips', { msg: response.message});
      });
    };

});