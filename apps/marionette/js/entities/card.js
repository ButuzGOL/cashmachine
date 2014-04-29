CashMachine.module('Entities', function(Entities, CashMachine, Backbone, Marionette, $, _) {
  Entities.Card = Backbone.Model.extend({
    url: function() {
      return CashMachine.config.apiRoot + '/cards/me';
    },
    defaults: {
      number: '',
      pin: ''
    },
    signin: function() {
      return $.ajax({
        url: CashMachine.config.apiRoot + '/signin',
        method: 'POST',
        data: this.toJSON()
      });
    },
    balance: function(take) {
      return $.ajax({
        url: this.url() + '/balance',
        method: 'PUT',
        data: { take: take }
      });
    }
  });
});
