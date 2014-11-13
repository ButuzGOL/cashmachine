EmberApp.AuthenticatedRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    if (Ember.isEmpty(this.controllerFor('sessions.new').get('currentCard'))) {
      this.redirectToSignin(transition);
    }
  },
  redirectToSignin: function() {
    this.transitionTo('sessions.new');
  },
  actions: {
    error: function(reason, transition) {
      if (reason.status === 401) {
        this.redirectToSignin();
      } else {
        console.log('unknown problem');
      }
    }
  }
});

