CashMachine.module('CardsApp.View', function(View, CashMachine) {
  View.Controller = {
    viewCard: function() {
      var card = new CashMachine.Entities.Card();

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
