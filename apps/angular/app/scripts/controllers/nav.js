'use strict';

/**
 * @ngdoc function
 * @name cashmachineApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the cashmachineApp
 */
angular.module('cashmachineApp')
  .controller('Nav', function($scope, auth, $location, $rootScope) {
    var vm = this;

    vm.signout = signout;

    function signout() {
      auth.signout()
        .then(function() {
          $rootScope.currentCard = null;
          $location.path('/sessions/new');
        });
    }

  });
