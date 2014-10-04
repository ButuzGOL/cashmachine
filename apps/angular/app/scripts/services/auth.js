'use strict';

/**
 * @ngdoc service
 * @name cashmachineApp.Auth
 * @description
 * # Auth
 * Factory in the cashmachineApp.
 */
angular.module('cashmachineApp')
  .factory('auth', auth);

function auth($http, APIROOT) {
  var service = {
    signin: signin,
    signout: signout
  };

  return service;

  function signin(data) {
    return $http.post(APIROOT + '/signin', data);
  }

  function signout() {
    return $http.get(APIROOT + '/signout');
  }
}
