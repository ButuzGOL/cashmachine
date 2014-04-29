CashMachine.module('CardsApp', function(CardsApp, CashMachine, Backbone, Marionette, $, _){
  CardsApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'cards/me': 'viewCard'
    }
  });

  var API = {
    viewCard: function() {
      CardsApp.View.Controller.viewCard();
    }
  };

  CashMachine.addInitializer(function(){
    new CardsApp.Router({
      controller: API
    });
  });
});
