EmberApp.AuthenticatedRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    if (Ember.isEmpty(this.controllerFor('sessions.new').get('token'))) {
      this.redirectToSignin(transition);
    }
  },
  redirectToSignin: function(transition) {
    this.transitionTo('sessions.new');
  },
  actions: {
    error: function(reason, transition) {
      if (reason.status === 401) {
        this.redirectToSignin(transition);
      } else {
        console.log('unknown problem');
      }
    }
  }
});

