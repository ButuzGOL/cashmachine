'use strict';

/**
 * @ngdoc function
 * @name cashmachineApp.controller:CardsBalanceCtrl
 * @description
 * # CardsBalanceCtrl
 * Controller of the cashmachineApp
 */
angular.module('cashmachineApp')
  .controller('CardsBalanceCtrl', function(Card, $rootScope) {
    var vm = this;

    vm.take = take;
    vm.reset = reset;

    vm.reset();

    function reset() {
      vm.operation = null;
      vm.errorMessage = null;
      vm.money = 0;
    }

    function take() {
      vm.errorMessage = null;

      Card.take(vm.money)
        .then(function(data) {
          vm.operation = data.data;
          $rootScope.currentCard.balance -= vm.money;
          vm.money = 0;
        }, function(data) {
          vm.errorMessage = data.data.message;
        });
    }
  });
