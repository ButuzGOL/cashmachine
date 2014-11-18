EmberApp.Card = DS.Model.extend({
  balance: DS.attr('number'),
  operations: DS.hasMany('operation', { async: true }),
  take: function(money) {
    var self = this;
    
    return Ember.$.ajax({
      url: EmberApp.config.apiRoot + '/cards/' + this.id + '/balance',
      method: 'PUT',
      data: { take: money }
    })
      .done(function() {
        self.set('balance', self.get('balance') - money);
      });
  }
});
