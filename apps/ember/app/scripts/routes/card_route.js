EmberApp.CardRoute = EmberApp.AuthenticatedRoute.extend({
  model: function() {
    return this.controllerFor('sessions.new').get('currentCard');
  }
});

