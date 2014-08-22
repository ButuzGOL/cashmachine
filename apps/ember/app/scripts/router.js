Ember.Router.map(function () {

  this.resource('cards', function(){
    this.resource('card', { path: '/:card_id' });
  });

  this.resource('sessions', function() {
    this.route('signin');
    this.route('signout');
  });

});
