angular.module('userApp', [
  'ngAnimate',
  'app.routes',
  'authService',
  'mainCtrl',
  'userCtrl',
  'userService'
])


//application configuration to integrate token into requests
.config(function($httpProvider){

  //attach our auth iterceptor to the http requests
  $httpProvider.interceptors.push('AuthInterceptor');
  
});
