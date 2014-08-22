EmberApp.Card = DS.Model.extend({
    number: DS.attr('number'),
    pin: DS.attr('number'),
    blocked: DS.attr('boolean'),
    balance: DS.attr('number')
});
