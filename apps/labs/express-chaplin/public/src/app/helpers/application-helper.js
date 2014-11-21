define([
  'require',
  'jquery',
  'jade',
  'chaplin',
], function(require, $, Jade, Chaplin) {
  'use strict';
  
  return {
    url: function(routeName) {
      var params = [].slice.call(arguments, 1);
      
      return Chaplin.helpers.reverse(routeName, params);
    },
    render: function(path, data) {
      var template = require('text!views/templates/' + path + '.jade');
      return Jade.compile(template, { compileDebug: true })(data);
    }
  };

});
