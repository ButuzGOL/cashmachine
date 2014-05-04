CashMachine.module('MenuApp.List', function(List, CashMachine, Backbone, Marionette, $, _) {

  var InfoView = Marionette.ItemView.extend({
    template: '#info-template'
  });

  List.Menu = Marionette.BossView.extend({
    template: '#menu-template',
    subViews: {
      info: InfoView
    },
    subViewContainers: {
      info: '[data-place=info]'
    }
  });
});
