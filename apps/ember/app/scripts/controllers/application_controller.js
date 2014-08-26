EmberApp.ApplicationController = Ember.ObjectController.extend({
  needs: ['sessionsNew'],
  isAuthenticated: function() {
    return !Ember.isEmpty(this.get('controllers.sessionsNew.currentCard'));
  }.property('controllers.sessionsNew.currentCard')
});

