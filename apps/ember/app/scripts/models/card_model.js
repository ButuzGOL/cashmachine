EmberApp.Card = DS.Model.extend({
  number: DS.attr('number'),
  balance: DS.attr('number'),
  // operations: DS.hasMany('operations', { async: true })
});
