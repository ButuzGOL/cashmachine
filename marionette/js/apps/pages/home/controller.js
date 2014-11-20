CashMachine.module('PagesApp.Home', function(Home, CashMachine, Backbone, Marionette, $, _) {
  Home.Controller = {
    show: function() {
      if (!CashMachine.mediator.card) {
        CashMachine.SessionsApp.Signin.Controller.form();
      } else {
        CashMachine.MenuApp.List.Controller.listMenu();
      }
    }
  };
});
