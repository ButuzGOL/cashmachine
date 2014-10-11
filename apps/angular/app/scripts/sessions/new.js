'use strict';

angular
  .module('cashmachineApp.sessions', [
    'ngRoute'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/sessions/new', {
        templateUrl: 'scripts/sessions/new.html',
        controller: 'SessionsNewController',
        controllerAs: 'vm'
      });
  });
