EmberApp.ApplicationAdapter = DS.RESTAdapter.extend({
  host: EmberApp.config.apiRoot
});

EmberApp.ApplicationSerializer = DS.RESTSerializer.extend({
  normalizePayload: function(type, payload) {
    if (type.toString() === 'EmberApp.Card') {
      return { card: payload };
    }
  }
});
