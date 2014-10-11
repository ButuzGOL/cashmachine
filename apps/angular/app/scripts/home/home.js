'use strict';

angular
  .module('cashmachineApp.home', [
    'ngRoute'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'scripts/home/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      });
  });
