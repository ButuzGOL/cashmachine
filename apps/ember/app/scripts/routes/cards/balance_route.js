EmberApp.CardBalanceRoute = EmberApp.AuthenticatedRoute.extend({
  renderTemplate: function() {
    this.render({
      into: 'application'
    });
  },
  model: function() {
    return this.controllerFor('sessions.new').get('currentCard');
  },
  setupController: function(controller, context) {
    this._super(controller, context);
    controller.reset();
  }
});

