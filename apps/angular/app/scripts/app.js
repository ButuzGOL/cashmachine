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
    'mgcrea.ngStrap'
  ])
  .config(function($routeProvider) {
    var checkIsSignin = function($rootScope, $location) {
      var isSignin = Boolean($rootScope.currentCard);

      if (!isSignin) {
        $location.url('/sessions/new');
      }
    };

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm',
        resolve: {
          issignin: checkIsSignin
        }
      })
      .when('/sessions/new', {
        templateUrl: 'views/sessions/new.html',
        controller: 'SessionsNewCtrl',
        controllerAs: 'vm'
      })
      .when('/cards/:id', {
        templateUrl: 'views/cards/view.html',
        controller: 'CardsViewCtrl',
        controllerAs: 'vm',
        resolve: {
          issignin: checkIsSignin
        }
      })
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
      }
    });
  });
