define([
  'mediator',
  'views/base/form-view',
  'text!views/templates/cards/new-form.jade'
], function(mediator, FormView, template) {
  'use strict';

  var CardsNewFormView = FormView.extend({
    template: template,
    events: {
      'click [data-action=back]': 'back'
    },
    back: function() {
      mediator.removeCard();
      this.dismiss();
    },
    save: function() {
      this.signin();
    },
    signin: function() {
      var _this = this,
          countTries;

      if (mediator.card) {
        this.model.set('number', mediator.card.get('number'));

        countTries = mediator.card.get('countTries');
        mediator.card.set('countTries', countTries + 1);

        if (countTries === 3) {
          this.model.block().done(function(response) {
            mediator.removeCard();
            _this.model.clear();
            _this.errorMessages.push(response.message);
            _this.render();
          });

          return;
        }
      }

      this.model.signin().done(function(response) {
        if (response.accessToken) {
          mediator.card.set('countTries', 0);
          mediator.signin(response.accessToken);
          _this.dismiss();
        } else if (response._id) {
          mediator.setCardNumber(_this.model.get('number'));
          _this.dismiss();
        } else if (response.message) {
          _this.errorMessages.push(response.message);
          _this.render();
        }
      }).fail(function() {
        _this.render();
      });
    }
  });

  return CardsNewFormView;
});