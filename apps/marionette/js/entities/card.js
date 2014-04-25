CashMachine.module('Entities', function(Entities, CashMachine, Backbone, Marionette, $, _) {
  Entities.Card = Backbone.Model.extend({
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
    }
  });
});
