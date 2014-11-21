define([
  'require',
  'underscore',
  'jade',
  'chaplin',
  'mediator',
  'helpers/application-helper',
  'helpers/sessions-helper',
  'text!views/templates/shared/form-error-messages.jade',
  'text!views/templates/shared/form-success-messages.jade'
], function(require, _, Jade, Chaplin, mediator) {
  'use strict';

  var View = Chaplin.View.extend({

    getTemplateFunction: function() {
      var template = this.template,
          templateFunc = null;

      if (_.isString(template)) {
        // Compile the template string to a function and save it
        // on the prototype. This is a workaround since an instance
        // shouldn’t change its prototype normally.
        templateFunc = Jade.compile(template, { compileDebug: true });
        // this.constructor.prototype.template = templateFunc;
      } else {
        templateFunc = template;
      }

      return templateFunc;
    },

    getTemplateData: function() {
      var object = Chaplin.View.prototype.getTemplateData.
        apply(this, arguments);
      
      if (mediator.card) {
        object.currentCard = mediator.card.serialize();
      }

      return _.defaults(object,
        { _: _ },
        require('helpers/application-helper'),
        require('helpers/sessions-helper')
      );
    }
  });

  return View;
});
