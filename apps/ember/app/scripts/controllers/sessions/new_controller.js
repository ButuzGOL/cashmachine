EmberApp.SessionsNewController = Ember.ObjectController.extend({
  needs: ['sessionsNew'],
  number: '',
  pin: '',
  errorMessage: '',
  stage: 0,
  currentCard: null, //Ember.$.cookie('auth_card'),
  token: null, //Ember.$.cookie('access_token'),
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
      stage: 0,
      currentCard: null,
      token: null
    });
    // Ember.$.ajaxSetup({
    //   headers: { 'Authorization': 'Bearer none' }
    // });
  },
  tokenChanged: function() {
    if (Ember.isEmpty(this.get('token'))) {
      Ember.$.removeCookie('access_token');
      Ember.$.removeCookie('auth_card');
    } else {
      Ember.$.cookie('access_token', this.get('token'));
      Ember.$.cookie('auth_card', this.get('currentCard'));
    }
  }.observes('token'),
  actions: {
    signin: function() {
      var self = this,
          stage = this.get('stage'),
          data = {
            number: this.get('number').replace(/-/g, '')
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

            // Ember.$.ajaxSetup({
            //   headers: { 'Authorization': 'Bearer ' + response.sessionId }
            // });

            self.store.find('card', 'me')
              .then(function(card) {
                self.setProperties({
                  'currentCard': card,
                  'token': response.sessionId
                });
                self.transitionTo('index');
              }, function(jqXHR) {
                self.set('errorMessage', 'Error');
              });
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
