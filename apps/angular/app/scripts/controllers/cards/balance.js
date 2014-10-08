'use strict';

/**
 * @ngdoc function
 * @name cashmachineApp.controller:CardsBalanceCtrl
 * @description
 * # CardsBalanceCtrl
 * Controller of the cashmachineApp
 */
angular.module('cashmachineApp')
  .controller('CardsBalanceCtrl', function($scope) {
    var vm = this;

    vm.money = 0;

    vm.take = take;

    function take() {
      console.log('1')
    }
  });
