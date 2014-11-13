EmberApp.ApplicationRoute = Ember.Route.extend({
  actions: {
    signout: function() {
      Ember.$.get(EmberApp.config.apiRoot + '/signout')
        .done(function() {
          this.controllerFor('sessions.new').set('currentCard', null);
          this.transitionTo('sessions.new');
        }.bind(this));
    }
  }
});
