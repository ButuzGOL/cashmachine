define([
  'views/base/view',
  'text!views/templates/header.jade'
], function(View, template) {
  'use strict';

  var HeaderView = View.extend({
    autoRender: true,
    className: 'header',
    region: 'header',
    id: 'header',
    template: template,
    listen: {
      'signinStatus mediator': 'render'
    }
  });

  return HeaderView;
});
