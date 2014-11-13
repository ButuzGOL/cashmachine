EmberApp.SessionsNewView = Ember.View.extend({
  didInsertElement: function() {
    var self = this;

    this._super();
    this.get('controller.controllers.sessionsNew').addObserver('stage', function(controller) {
      if (controller.get('stage') === 0 && !self.isDestroyed) {
        self.rerender();
      }
    });
    this.initNumberMask();
  },
  initNumberMask: function() {
    Ember.$('#number').mask('999-999-999');
  }
});
