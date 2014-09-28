'use strict';

/**
 * @ngdoc function
 * @name cashmachineApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the cashmachineApp
 */
angular.module('cashmachineApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
