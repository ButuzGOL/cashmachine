'use strict';

/**
 * @ngdoc function
 * @name cashmachineApp.controller:SessionsNewCtrl
 * @description
 * # SessionsNewCtrl
 * Controller of the cashmachineApp
 */
angular.module('cashmachineApp.sessions')
  .controller('SessionsNewController', SessionsNewController);

function SessionsNewController($scope, $rootScope, $log, $location, auth, Card, $alert) {
    var vm = this;

    vm.signin = signin;
    vm.reset = reset;

    vm.reset();

    function reset() {
      vm.number = null;
      vm.pin = null;
      vm.stage = 0;
      vm.errorMessage = null;
    }

    function signin() {
      var data = {
        number: vm.number.replace(/-/g, '')
      };

      if (vm.stage === 1) {
        data.pin = vm.pin;
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
                $alert({
                  title: 'Congratulations!',
                  content: 'You signin.',
                  type: 'material',
                  duration: 3,
                  dismissable: false
                });
              }, function() {
                vm.errorMessage = 'Error';
              });
          }
        }, function(data) {
          vm.errorMessage = data.data.message;
        });
    }
  }
