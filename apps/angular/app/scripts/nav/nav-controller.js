'use strict';

/**
 * @ngdoc function
 * @name cashmachineApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the cashmachineApp
 */
angular.module('cashmachineApp')
  .controller('NavCotroller', function($scope, auth, $location, $rootScope, $alert) {
    var vm = this;

    vm.signout = signout;

    function signout() {
      auth.signout()
        .then(function() {
          $rootScope.currentCard = null;
          $location.path('/sessions/new');
          $alert({
            title: 'Congratulations!',
            content: 'You signout.',
            type: 'material',
            duration: 3,
            dismissable: false
          });
        });
    }

  });
