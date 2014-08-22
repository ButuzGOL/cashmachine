EmberApp.SessionsSigninController = Ember.ObjectController.extend({
  number: '',
  pin: '',
  errorMessage: '',
  stage: 0,
  token: '',
  isFirstStage: function() {
    return this.get('stage') === 0;
  }.property('stage'),
  isSecondStage: function() {
    return this.get('stage') === 1;
  }.property('stage'),
  reset: function() {
    this.setProperties({
      number: null,
      pin: null,
      stage: 0
    });
  },
  tokenChanged: function() {
    localStorage.token = this.get('token');
  }.observes('token'),
  actions: {
    login: function() {
      var self = this,
          stage = this.get('stage'),
          data = {
            number: this.get('number')
          };

      if (stage === 1) {
        data.pin = this.get('pin');
      }

      self.set('errorMessage', null);

      Ember.$.post(EmberApp.config.apiRoot + '/signin', data)
        .then(function(response) {
          if (stage === 0) {
            self.set('stage', 1);
          } else {
            self.set('token', response.sessionId);
            self.transitionToRoute('cards');
          }
        }, function(jqXHR) {
          self.set('errorMessage', jqXHR.responseJSON.message);
        });
    },
    cancel: function() {
      this.reset();
    }
  }
});
