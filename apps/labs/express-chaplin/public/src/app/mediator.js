define([
  'underscore',
  'chaplin',
  'models/card'
], function(_, Chaplin, CardModel) {
  'use strict';

  var mediator = Chaplin.mediator;

  _.extend(mediator, {
    createCard: function() {
      this.card = new CardModel();
      this.card.set('countTries', 0);
    },
    removeCard: function() {
      this.card.dispose();
      this.card = null;
    },
    setCardNumber: function(number) {
      if (!this.card) {
        this.createCard();
      }

      this.card.set('number', number);
    },
    signin: function(accessToken) {
      var _this = this;
      
      localStorage.setItem('accessToken', accessToken);
      
      if (!this.card) {
        this.createCard();
      }
      this.card.set({ accessToken: accessToken });
      
      this.card.fetchCurrent().then(function() {
        _this.publish('signinStatus', true);
      });
    },
    signout: function() {
      if (!this.card) {
        return;
      }
      
      localStorage.removeItem('accessToken');
      this.removeCard();
      this.publish('signinStatus', false);
    }
  });

  return mediator;
});