CashMachine.module('SessionsApp', function(SessionsApp, CashMachine, Backbone, Marionette, $, _) {
  SessionsApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'signout': 'signout'
    }
  });

  var API = {
    signout: function() {
      CashMachine.vent.trigger('signout');
      Backbone.history.navigate('/', { trigger: true });
    }
  };

  CashMachine.addInitializer(function() {
    new SessionsApp.Router({
      controller: API
    });
  });

});
