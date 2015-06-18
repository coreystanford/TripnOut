app.directive('trip', function(){
  return {
    restrict: 'E',
    scope: {
      details: '='
    },
    templateUrl: 'static/app/shared/directives/trip.html'
  };
});