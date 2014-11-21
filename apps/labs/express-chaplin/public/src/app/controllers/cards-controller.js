define([
  'mediator',
  'controllers/base/controller',
  'views/cards/show-page-view',
  'models/card',
  'views/cards/balance-form-view',
], function(mediator, Controller, CardsShowPageView,
  CardModel, CardsBalanceFormView) {
  'use strict';

  var CardsController = Controller.extend({
    show: function() {
      this.model = new CardModel(mediator.card.serialize());

      this.view = new CardsShowPageView({
        model: this.model
      });
    },
    balance: function() {
      this.model = new CardModel(mediator.card.serialize());
      
      this.view = new CardsBalanceFormView({
        model: this.model
      });
    }
  });

  return CardsController;
});
