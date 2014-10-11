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

function auth($http, APIROOT, $rootScope) {
  var service = {
    signin: signin,
    signout: signout,
    isSignin: isSignin
  };

  return service;

  function signin(data) {
    return $http.post(APIROOT + '/signin', data);
  }

  function signout() {
    return $http.get(APIROOT + '/signout');
  }

  function isSignin() {
    return Boolean($rootScope.currentCard)
  }
}
