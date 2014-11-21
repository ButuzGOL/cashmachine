define([
  'jquery',
  'underscore',
  'chaplin',
  'mediator',
  'config/application',
  'routes',
  'nprogress',
  'views/layout'
], function($, _, Chaplin, mediator, applicationConfig, routes, NProgress, Layout) {
  'use strict';
  
  // The application object
  // Choose a meaningful name for your application
  var Application = Chaplin.Application.extend({
    // Set your application name here so the document title is set to
    // “Controller title – Site title” (see Layout#adjustTitle)
    title: applicationConfig.title,
    start: function() {
      var _this = this,
          callback;
      
      callback = function() {
        Chaplin.Application.prototype.start.apply(_this);
      };
      
      NProgress.start();

      _this.initAuth(callback);
    },
    initAuth: function(callback) {
      var _this = this,
          modifiedCallback,
          accessToken = window.localStorage.getItem('accessToken');
      
      if (!accessToken) {
        callback();
      } else {
        modifiedCallback = function() {
          _this.unsubscribeEvent('signinStatus', modifiedCallback);
          callback();
        };
        this.subscribeEvent('signinStatus', modifiedCallback);
        mediator.signin(accessToken);
      }
    },
    initLayout: function(options) {
      this.layout = new Layout(_.defaults(options, { title: this.title }));
    },
    initMediator: function() {
      mediator.card = null;
      
      Chaplin.Application.prototype.initMediator.call(this, arguments);
    }
  });

  return Application;
});
