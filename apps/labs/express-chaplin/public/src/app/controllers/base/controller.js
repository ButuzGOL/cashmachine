define([
  'jquery',
  'chaplin',
  'mediator',
  'views/site-view',
  'views/header-view',
  'views/footer-view'
], function($, Chaplin, mediator, SiteView, HeaderView,
  FooterView) {
  'use strict';

  var Controller = Chaplin.Controller.extend({
    beforeAction: function() {
      var _this = this;

      this.publishEvent('controller:actionStart');
      
      this.compose('site', SiteView);
      this.compose('header', HeaderView);
      this.compose('footer', FooterView);

      this.subscribeEvent('dispatcher:dispatch', function() {
        if (!$.active) {
          _this.afterAction();
        }
      });
    },
    afterAction: function() {
      this.publishEvent('controller:actionDone');
    }
  });

  return Controller;
});
