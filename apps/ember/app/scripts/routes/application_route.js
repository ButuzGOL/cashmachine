EmberApp.ApplicationRoute = Ember.Route.extend({
  actions: {
    signout: function() {
      this.controllerFor('sessions.new').reset();
      this.transitionTo('sessions.new');
    }
  }
});
