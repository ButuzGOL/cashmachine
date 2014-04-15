var CashMachine = new Marionette.Application();

CashMachine.addRegions({
  headerRegion: "#header-region",
  mainRegion: "#main-region"
});

CashMachine.on('initialize:after', function(){
  Backbone.history.start();
});
