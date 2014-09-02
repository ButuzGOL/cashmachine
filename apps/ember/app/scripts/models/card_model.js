EmberApp.Card = DS.Model.extend({
  balance: DS.attr('number'),
  operations: DS.hasMany('operation', { async: true })
});
