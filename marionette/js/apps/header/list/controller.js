CashMachine.module('HeaderApp.List', function(List, CashMachine) {
  List.Controller = {
    listHeader: function() {
      var header = new List.Header();

      CashMachine.headerRegion.show(header);
    }
  };
});
