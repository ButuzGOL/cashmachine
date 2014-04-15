CashMachine.module('SessionsApp.Signin', function(Signin, CashMachine, Backbone, Marionette, $, _) {
  Signin.Controller = {
    form: function() {
      var view = new Signin.Form();

      CashMachine.mainRegion.show(view);
    }
  };
});
