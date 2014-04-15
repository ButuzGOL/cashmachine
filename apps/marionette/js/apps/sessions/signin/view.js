CashMachine.module('SessionsApp.Signin', function(Signin, CashMachine, Backbone, Marionette, $, _){
  Signin.Form = Marionette.ItemView.extend({
    template: '#sessions-signin-template'
  });
});
