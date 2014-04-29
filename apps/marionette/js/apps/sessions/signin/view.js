CashMachine.module('SessionsApp.Signin', function(Signin, CashMachine, Backbone, Marionette, $, _) {
  Signin.Form = Marionette.ItemView.extend({
    template: '#sessions-signin-template',
    stage: 0,
    errorMessages: [],
    ui: {
      'number': '[name="number"]',
      'pin': '[name="pin"]'
    },
    events: {
      'keyup input': 'changedAttribute',
      'keydown input': 'changedAttribute',

      'click [data-action=next]': 'next',
      'click [data-action=submit]': 'submit',
      'click [data-action=cancel]': 'cancel'
    },
    serializeData: function() {
      var object =
        Marionette.ItemView.prototype.serializeData.apply(this, arguments);

      return _.extend(object, {
        stage: this.stage,
        errorMessages: this.errorMessages
      });
    },
    render: function() {
      Marionette.ItemView.prototype.render.apply(this, arguments);

      this.errorMessages = [];
    },
    changedAttribute: function() {
      var setObject = {},
          $target = $(event.target);

      setObject[$target.attr('name')] = $target.val();
      this.model.set(setObject);
    },
    next: function(event) {
      var _this = this;

      event.preventDefault();

      this.model.signin()
        .done(function() {
          _this.stage = 1;
        })
        .fail(function(jqXHR) {
          _this.errorMessages = [jqXHR.responseJSON.message];
        })
        .always(function() {
          _this.render();
        });
    },
    submit: function(event) {
      var _this = this;

      event.preventDefault();

      this.model.signin()
        .done(function() {
           CashMachine.vent.trigger('signin', _this.model);
        })
        .fail(function() {
          _this.errorMessages = [jqXHR.responseJSON.message];
        });
    },
    cancel: function(event) {
      event.preventDefault();

      this.stage = 0;

      this.model.clear();
      this.model.set(this.model.defaults);

      this.render();
    }
  });
});
