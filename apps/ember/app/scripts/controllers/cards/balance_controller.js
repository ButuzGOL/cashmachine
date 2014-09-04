EmberApp.CardBalanceController = Ember.ObjectController.extend({
  errorMessage: null,
  money: null,
  currentOperation: null,
  reset: function() {
    this.setProperties({
      money: null
    });
  },
  actions: {
    take: function() {
      var self = this;

      this.set('errorMessage', null);

      this.get('model').take(this.get('money'))
        .then(function(response) {
          var operation = self.store.createRecord('operation', response);
          self.set('currentOperation', operation);
          self.set('money', null);
        })
        .fail(function(jqXHR) {
          self.set('errorMessage', jqXHR.responseJSON.message);
        });
    }
  }
});
