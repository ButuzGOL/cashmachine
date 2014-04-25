CashMachine.module('MenuApp.List', function(List, CashMachine, Backbone, Marionette, $, _) {
  List.Menu = Marionette.ItemView.extend({
    template: '#menu-template'
  });
});
