define(function() {
  'use strict';

  // The routes for the application. This module returns a function.
  // `match` is match method of the Router
  return function(match) {
    match('', 'pages#home');
    match('card', 'cards#show');
    match('balance', 'cards#balance');
    match('signout', 'sessions#signout');
  };
});