CashMachine.module('CardsApp.View', function(View, CashMachine, Backbone, Marionette, $, _) {
  View.Controller = {
    viewCard: function() {
      var card = CashMachine.mediator.card;
      card.fetch().done(function() {
        var view = new View.View({
          model: card,
          collection: card.get('operations')
        });

        CashMachine.mainRegion.show(view);
      });
    }
  }
});
