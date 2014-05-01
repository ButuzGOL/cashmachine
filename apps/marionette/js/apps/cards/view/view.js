CashMachine.module('CardsApp.View', function(View, CashMachine, Backbone, Marionette, $, _) {
  var ItemView,
      NoItemsView;

  ItemView = Marionette.ItemView.extend({
    template: '#cards-view-operations-item-template'
  });

  NoItemsView = Backbone.Marionette.ItemView.extend({
    template: "#cards-view-operations-no-item-template"
  });

  View.View = Marionette.CompositeView.extend({
    template: '#cards-view-template',
    itemViewContainer: '[data-place="card-operations"]',
    itemView: ItemView,
    emptyView: NoItemsView,
    isFetchedOperations: false,
    isEmpty: function(collection) {
      return !collection.length && this.isFetchedOperations;
    },
    events: {
      'click [data-action="operations"]': 'operations'
    },
    operations: function(event) {
      event.preventDefault();

      this.collection.fetch().done(function() {
        this.isFetchedOperations = true;
        this.render();
      }.bind(this));
    }
   });
});
