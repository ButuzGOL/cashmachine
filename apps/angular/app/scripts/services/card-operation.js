'use strict';

/**
 * @ngdoc service
 * @name cashmachineApp.CardOperation
 * @description
 * # CardOperation
 * Factory in the cashmachineApp.
 */
angular.module('cashmachineApp')
  .factory('CardOperation', function(APIROOT, $resource) {
    return $resource(APIROOT + '/cards/me/operations', {}, {
      index: { method: 'GET', isArray: true },
    });
  });
