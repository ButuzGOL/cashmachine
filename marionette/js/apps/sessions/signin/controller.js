CashMachine.module('SessionsApp.Signin', function(Signin, CashMachine) {
  Signin.Controller = {
    form: function() {
      var card, view;

      card = new CashMachine.Entities.Card();

      view = new Signin.Form({
        model: card
      });

      CashMachine.mainRegion.show(view);
    }
  };
});
