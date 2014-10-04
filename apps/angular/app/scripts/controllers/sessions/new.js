'use strict';

/**
 * @ngdoc function
 * @name cashmachineApp.controller:SessionsNew
 * @description
 * # SessionsNew
 * Controller of the cashmachineApp
 */
angular.module('cashmachineApp')
  .controller('SessionsNew', SessionsNew);

function SessionsNew($scope, $rootScope, $log, $location, auth, Card) {
    var vm = this;

    vm.signin = signin;
    vm.reset = reset;

    vm.reset();

    function reset() {
      vm.number = null;
      vm.stage = 0;
      vm.errorMessage = null;
    }

    function signin() {
      var data = {
        number: vm.number
      };

      if (vm.stage === 1) {
        data.pin = this.pin;
      }

      vm.errorMessage = null;

      auth.signin(data)
        .then(function(response) {

          if (vm.stage === 0) {
            vm.stage = 1;
          } else {
            Card.get({ id: 'me' }).$promise
              .then(function(card) {
                $rootScope.currentCard = card;
                $location.path('/');
              }, function() {
                vm.errorMessage = 'Error';
              });
          }
        }, function(data) {

          vm.errorMessage = data.data.message;
        });
    }
  }
