CashMachine.module('PagesApp', function(PagesApp, CashMachine) {
  PagesApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      '': 'home'
    }
  });

  var API = {
    home: function() {
      PagesApp.Home.Controller.show();
    }
  };

  CashMachine.vent.on('signin', API.home);
  CashMachine.vent.on('signout', API.home);

  CashMachine.addInitializer(function() {
    new PagesApp.Router({
      controller: API
    });
  });

});
