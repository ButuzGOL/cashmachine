define([
  'mediator',
  'views/base/form-view',
  'text!views/templates/cards/balance-form.jade'
], function(mediator, FormView, template) {
  'use strict';

  var CardsBalanceFormView = FormView.extend({
    template: template,
    autoRender: true,
    region: 'main',
    save: function() {
      this.take();
    },
    take: function() {
      var _this = this;

      this.model.take().done(function(response) {
        if (response.message) {
          _this.errorMessages.push(response.message);
          _this.render();
        } else {
          mediator.card.set('balance', mediator.card.get('balance') - _this.model.get('take'));
          _this.model.set('operation', response);
          _this.render();
        }
      });
    }
  });

  return CardsBalanceFormView;
});