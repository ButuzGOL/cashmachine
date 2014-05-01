CashMachine.module('CardsApp.Balance', function(Balance, CashMachine, Backbone, Marionette, $, _) {
  Balance.Controller = {
    balanceCard: function() {
      var layout,
          form,
          operation;

      form = new Balance.Form({
        model: CashMachine.mediator.card
      });

      operation = new Balance.Operation({
        model: new CashMachine.Entities.Card.Operation()
      });

      layout = new Balance.Layout({
      });
      CashMachine.mainRegion.show(layout);

      layout.content.show(form);

      form.on('balanceForm:submit', function(data) {
        operation.model.set(data);
        layout.content.show(operation);
      });
    }
  }
});
