CashMachine.module('Entities', function(Entities, CashMachine, Backbone, Marionette, $, _) {
  Entities.Card.Operations = Backbone.Collection.extend({
    model: Entities.Card.Operation
  });

  Entities.Card.Operation = Backbone.Model.extend({
  });
});
