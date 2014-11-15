CashMachine.module('HeaderApp.List', function(List, CashMachine, Backbone, Marionette, $, _) {
  List.Header = Marionette.ItemView.extend({
    template: '#header-template',
    className: 'navbar navbar-inverse navbar-fixed-top',
    initialize: function() {
      Marionette.ItemView.prototype.initialize.apply(this, arguments);

      CashMachine.vent.on('signin', this.render);
      CashMachine.vent.on('signout', this.render);
    },
    events: {
      'click [data-action="signout"]': 'signout'
    },
    serializeData: function() {
      var object =
        Marionette.ItemView.prototype.serializeData.apply(this, arguments),
          card = CashMachine.mediator.card;

      return _.extend(object, {
        card: (card) ? card.toJSON() : null
      });
    },
    signout: function(event) {
      event.preventDefault();

      CashMachine.mediator.card.signout().done(function() {
        CashMachine.vent.trigger('signout');
        Backbone.history.navigate('/', { trigger: true });
      });
    }
  });
});
