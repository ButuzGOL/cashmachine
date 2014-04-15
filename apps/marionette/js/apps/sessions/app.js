CashMachine.module('SessionsApp', function(SessionsApp, CashMachine, Backbone, Marionette, $, _) {
  CashMachine.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "": "form",
    }
  });

  var API = {
    form: function() {
      SessionsApp.Signin.Controller.form();
    }
  };

  CashMachine.addInitializer(function() {
    new CashMachine.Router({
      controller: API
    });
  });

});
