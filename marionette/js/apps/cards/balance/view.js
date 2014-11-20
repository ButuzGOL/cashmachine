CashMachine.module('CardsApp.Balance', function(Balance, CashMachine, Backbone, Marionette, $, _) {

  Balance.Layout = Marionette.Layout.extend({
    template: '#cards-balance-layout-template',
    regions: {
      content: '[data-place=content]'
    }
  });

  Balance.Operation = Marionette.ItemView.extend({
    template: '#cards-view-operations-item-template'
  });

  Balance.Form = Marionette.ItemView.extend({
    template: '#cards-balance-template',
    errorMessages: [],
    take: '',
    events: {
      'change input[name="take"]': 'changedTake',

      'click [data-action="cancel"]': 'cancel',
      'click [data-action="submit"]': 'submit'
    },
    ui: {
      'take': '[name="take"]'
    },
    serializeData: function() {
      var object =
        Marionette.ItemView.prototype.serializeData.apply(this, arguments);

      return _.extend(object, {
        take: this.take,
        errorMessages: this.errorMessages
      });
    },
    changedTake: function(event) {
      this.take = this.ui.take.val();
    },
    cancel: function(event) {
      event.preventDefault();
      Backbone.history.navigate('/', { trigger: true });
    },
    submit: function(event) {
      var _this = this;

      event.preventDefault();

      this.model.balance(this.take)
        .done(function(response) {
          _this.trigger('balanceForm:submit', response);
        })
        .fail(function(jqXHR) {
          _this.errorMessages = [jqXHR.responseJSON.message];
          _this.render();
        });
    }
  });
});
