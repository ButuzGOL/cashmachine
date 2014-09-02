EmberApp.ApplicationAdapter = DS.RESTAdapter.extend({
  host: EmberApp.config.apiRoot
});

EmberApp.ApplicationSerializer = DS.RESTSerializer.extend({
  normalizePayload: function(type, payload) {
    if (type.toString() === 'EmberApp.Card') {
      payload.links = { 'operations': '/cards/me/operations' };
      return { card: payload };
    } else if (type.toString() === 'EmberApp.Operation') {
      return { operations: payload };
    }
  }
});
