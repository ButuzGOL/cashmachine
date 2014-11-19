'use strict';

/**
 * @ngdoc overview
 * @name cashmachineApp
 * @description
 * # cashmachineApp
 *
 * Main module of the application.
 */
angular
  .module('cashmachineApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'mgcrea.ngStrap',
    'ngMockE2E',

    'cashmachineApp.home',
    'cashmachineApp.sessions',
    'cashmachineApp.cards'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function($httpProvider) {

    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.responseInterceptors.push(function($q, $location) {
      return function(promise) {
        return promise.then(
          function(response) {
            return response;
          },
          function(response) {
            if (response.status === 401) {
              $location.url('/sessions/new');
            }
            return $q.reject(response);
          }
        );
      };
    });
  });

angular.module('cashmachineApp').run(function($location, auth, $rootScope) {

  var routesThatDontRequireAuth = ['/sessions/new'];

  var routeClean = function(route) {
    return routesThatDontRequireAuth.indexOf(route) !== -1;
  };

  $rootScope.$on('$routeChangeStart', function(event, next, current) {

    if (!auth.isSignin() && !routeClean($location.url())) {
      $location.path('/sessions/new');
    }
  });

});
