'use strict';

/**
 * @ngdoc directive
 * @name cashmachineApp.directive:maskedInput
 * @description
 * # maskedInput
 */
angular.module('cashmachineApp')
  .directive('maskedInput', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        $(element).mask('999-999-999');
      }
    };
  });
