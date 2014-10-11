'use strict';

/**
 * @ngdoc directive
 * @name cashmachineApp.directive:cardOperation
 * @description
 * # cardOperation
 */
angular.module('cashmachineApp.cards')
  .directive('cardOperation', function () {
    return {
      templateUrl: 'scripts/cards/common/directives/card-operation.html',
      restrict: 'E',
      scope: {
        operation: '='
      }
    };
  });
