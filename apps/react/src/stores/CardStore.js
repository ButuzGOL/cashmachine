var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionTypes');
var merge = require('react/lib/merge');
var CardActions = require('../actions/CardActions');
var config = require('../config');
var superagent = require('superagent');
var AppActions = require('../actions/AppActions');

var CHANGE_EVENT = 'change';

function fetch(id) {

  superagent
    .get(config.apiRoot + '/cards/' + id)
    .end(function(res) {
      if (res.ok) {
        CardStore.set(res.body);
        CardActions.changed();
      } else {
        AppActions.requestFail();
      }
    });
}

function fetchOperations(id) {

  superagent
    .get(config.apiRoot + '/cards/' + id + '/operations')
    .end(function(res) {
      if (res.ok) {
        CardStore.setOperations(res.body);
        CardActions.changed();
      } else {
        AppActions.requestFail();
      }
    });
}

var CardStore = merge(EventEmitter.prototype, {
  card: {
    id: null,
    balance: null,
    operations: []
  },
  set(data) {
    this.card = merge(this.card, data);
  },
  setOperations(data) {
    this.card.operations = data;
  },
  fetchOperations(id) {
    fetchOperations(id);
  },
  get() {
    return this.card;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

CardStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case ActionTypes.CARD_FETCH:
      fetch(action.id);
      break;

    case ActionTypes.CARD_CHANGED:
      CardStore.emitChange();
      break;

    default:
      return true;
  }

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = CardStore;
