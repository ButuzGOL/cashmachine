CashMachine.module('HeaderApp.List', function(List, CashMachine, Backbone, Marionette, $, _) {
  List.Controller = {
    listHeader: function() {
      var header = new List.Header();

      CashMachine.headerRegion.show(header);
    }
  };
});
