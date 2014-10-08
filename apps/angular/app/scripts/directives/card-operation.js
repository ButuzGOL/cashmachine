'use strict';

/**
 * @ngdoc directive
 * @name cashmachineApp.directive:cardOperation
 * @description
 * # cardOperation
 */
angular.module('cashmachineApp')
  .directive('cardOperation', function () {
    return {
      templateUrl: 'views/partials/card-operation.html',
      restrict: 'E',
      scope: {
        operation: '='
      }
    };
  });
