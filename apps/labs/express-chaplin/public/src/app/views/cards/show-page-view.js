define([
  'mediator',
  'views/base/page-view',
  'text!views/templates/cards/show.jade'
], function(mediator, PageView, template) {
  'use strict';

  var CardsShowPageView = PageView.extend({
    template: template,
    autoRender: true
  });

  return CardsShowPageView;
});