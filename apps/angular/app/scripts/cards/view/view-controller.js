'use strict';

/**
 * @ngdoc function
 * @name cashmachineApp.controller:CardsViewCtrl
 * @description
 * # CardsViewCtrl
 * Controller of the cashmachineApp
 */
angular.module('cashmachineApp.cards')
  .controller('CardsViewController', function($scope, CardOperation) {
    var vm = this;

    vm.fetchOperations = fetchOperations;
    vm.cardOpertions = [];
    vm.showOperations = false;

    function fetchOperations() {
      CardOperation.index().$promise
        .then(function(cardOperations) {
          vm.showOperations = true;
          vm.cardOperations = cardOperations;
        });
    }
  });
