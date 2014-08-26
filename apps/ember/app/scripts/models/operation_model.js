EmberApp.Operation = DS.Model.extend({
  code: DS.attr('number'),
  card: DS.belongsTo('card')
});
