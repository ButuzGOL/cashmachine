CashMachine.module('Entities', function(Entities, CashMachine, Backbone, Marionette, $, _) {
  Entities.Card = Backbone.Model.extend({
    initialize: function() {
      Backbone.Model.prototype.initialize.apply(this, arguments);

      this.set('operations', new CashMachine.Entities.Card.Operations());
    },
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
        data: { number: this.get('number'), pin: this.get('pin') }
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
