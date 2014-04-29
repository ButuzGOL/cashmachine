CashMachine.module('CardsApp.View', function(View, CashMachine, Backbone, Marionette, $, _) {
  View.View = Marionette.ItemView.extend({
    template: '#cards-view-template',
    events: {
      'click [data-action="operations"]': 'operations'
    },
    operations: function() {
    }
  });
});
