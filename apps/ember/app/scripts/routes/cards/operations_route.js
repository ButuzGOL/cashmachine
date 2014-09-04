EmberApp.CardOperationsRoute = EmberApp.AuthenticatedRoute.extend({
  model: function() {
    return this.controllerFor('sessions.new')
      .get('currentCard')
      .get('operations');
  }
});

