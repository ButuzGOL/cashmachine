CashMachine.module('CardsApp', function(CardsApp, CashMachine){
  CardsApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'cards/me': 'viewCard',
      'cards/me/balance': 'balanceCard'
    }
  });

  var API = {
    viewCard: function() {
      CardsApp.View.Controller.viewCard();
    },
    balanceCard: function() {
      CardsApp.Balance.Controller.balanceCard();
    }
  };

  CashMachine.addInitializer(function(){
    new CardsApp.Router({
      controller: API
    });
  });
});
