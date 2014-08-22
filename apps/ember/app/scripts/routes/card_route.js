EmberApp.CardRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('card', params.card_id).then(function(card) {
      console.log(card);
    });
  }
});

