CashMachine.module('MenuApp.List', function(List, CashMachine, Backbone, Marionette, $, _) {
  List.Controller = {
    listMenu: function() {
      var view = new List.Menu();

      CashMachine.mainRegion.show(view);
    }
  };
});
