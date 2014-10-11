'use strict';
angular
  .module('cashmachineApp.cards', [
    'ngRoute'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/cards/:id', {
        templateUrl: 'scripts/cards/view/view.html',
        controller: 'CardsViewController',
        controllerAs: 'vm'
      })
      .when('/cards/:id/balance', {
        templateUrl: 'scripts/cards/balance/balance.html',
        controller: 'CardsBalanceController',
        controllerAs: 'vm'
      });
  });
