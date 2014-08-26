EmberApp.CardRoute = EmberApp.AuthenticatedRoute.extend({
  model: function(params) {
    return this.get('store').find('card', 'me').then(function(card) {
      console.log(card);
    });
  }
});

