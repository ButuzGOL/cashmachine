CashMachine.module('HeaderApp.List', function(List, CashMachine, Backbone, Marionette, $, _) {
  List.Controller = {
    listHeader: function() {
      var headers = new List.Headers();

      CashMachine.headerRegion.show(headers);
    }
  };
});
