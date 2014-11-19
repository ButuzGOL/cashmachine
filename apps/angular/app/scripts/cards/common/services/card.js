'use strict';

/**
 * @ngdoc service
 * @name cashmachineApp.Card
 * @description
 * # Card
 * Factory in the cashmachineApp.
 */
angular.module('cashmachineApp.cards')
  .factory('Card', function(APIROOT, $resource, $http) {
    var Card = $resource(APIROOT + '/cards/:id', { id: '@id' });

    Card.take = function(money) {
      return $http.put(APIROOT + '/cards/:id/balance', {
        id: '@id',
        take: money
      });
    };

    return Card;
  });
