CashMachine.module('PagesApp', function(PagesApp, CashMachine, Backbone, Marionette, $, _) {
  PagesApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "": "home"
    }
  });

  var API = {
    home: function() {
      PagesApp.Home.Controller.show();
    }
  };

  CashMachine.vent.on('signin', API.home);
  
  CashMachine.addInitializer(function() {
    new PagesApp.Router({
      controller: API
    });
  });

});
