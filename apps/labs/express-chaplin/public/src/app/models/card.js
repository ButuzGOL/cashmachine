define([
  'jquery',
  'models/base/model'
], function($, Model) {
  'use strict';

  var Card = Model.extend({
    signin: function() {
      return this.ajax('/signin', 'POST', this.serialize());
    },
    fetchCurrent: function() {
      var _this = this;

      return this.ajax('/cards/me', 'GET', {
        'access_token': this.get('accessToken')
      }).done(function(response) {
        _this.set(response);
      });
    },
    take: function() {
      return this.ajax('/cards/balance?' +
        $.param({ access_token: this.get('accessToken') }),
        'PUT', { take: this.get('take') });
    },
    block: function() {
      return this.ajax('/cards/block', 'PUT', this.serialize());
    }
  });

  return Card;
});