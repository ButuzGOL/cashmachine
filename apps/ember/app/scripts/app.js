var EmberApp = window.EmberApp = Ember.Application.create({
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true
});

/* Order and include as you please. */
require('scripts/config');
require('scripts/controllers/**/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/**/*');
require('scripts/components/*');
require('scripts/views/**/*');
require('scripts/router');


Ember.$.ajaxSetup({
  dataType: 'json',
  xhrFields: {
    withCredentials: true
  },
  crossDomain: true
});

$.cookie.json = true;
