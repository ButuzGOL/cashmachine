CashMachine.module('HeaderApp', function(Header, CashMachine) {
  var API = {
    listHeader: function() {
      Header.List.Controller.listHeader();
    }
  };

  Header.on('start', function() {
    API.listHeader();
  });
});
