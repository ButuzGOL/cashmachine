'use strict';

/**
 * @ngdoc function
 * @name cashmachineApp.controller:CardsViewCtrl
 * @description
 * # CardsViewCtrl
 * Controller of the cashmachineApp
 */
angular.module('cashmachineApp')
  .controller('CardsViewCtrl', function($scope) {
    var vm = this;

    vm.showOperations = showOperations;
    vm.opertions = [];

    function showOperations() {

    }
  });
