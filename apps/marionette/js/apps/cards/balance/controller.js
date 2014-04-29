CashMachine.module('CardsApp.Balance', function(Balance, CashMachine, Backbone, Marionette, $, _) {
  Balance.Controller = {
    balanceCard: function() {
      var view = new Balance.View({
        model: CashMachine.mediator.card
      });

      CashMachine.mainRegion.show(view);
    }
  }
});
