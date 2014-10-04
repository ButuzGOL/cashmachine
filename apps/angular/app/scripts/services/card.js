'use strict';

/**
 * @ngdoc service
 * @name cashmachineApp.Card
 * @description
 * # Card
 * Factory in the cashmachineApp.
 */
angular.module('cashmachineApp')
  .factory('Card', function(APIROOT, $resource) {
    return $resource(APIROOT + '/cards/:id', { id: '@id' });
  });
