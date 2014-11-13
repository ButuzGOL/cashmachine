CashMachine.module('Entities', function(Entities, CashMachine, Backbone, Marionette, $, _) {
  Entities.Card.Operation = Backbone.Model.extend({
  });

  Entities.Card.Operations = Backbone.Collection.extend({
    model: Entities.Card.Operation,
    url: function() {
      return CashMachine.config.apiRoot + '/cards/me/operations';
    }
  });
});
