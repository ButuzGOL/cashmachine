'use strict';

/**
 * @ngdoc directive
 * @name cashmachineApp.directive:cardOperations
 * @description
 * # cardOperations
 */
angular.module('cashmachineApp')
  .directive('cardOperations', function () {
    return {
      templateUrl: 'views/partials/card-operations.html',
      restrict: 'E',
      scope: {
        operations: '='
      }
    };
  });
