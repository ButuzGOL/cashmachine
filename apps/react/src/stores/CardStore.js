var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionTypes');
var merge = require('react/lib/merge');
var CardActions = require('../actions/CardActions');
var config = require('../config');
var superagent = require('superagent');
var AppActions = require('../actions/AppActions');

var CHANGE_EVENT = 'change';
var TAKE_MONEY_SUCCESS_EVENT = 'takeMoneySuccess';
var TAKE_MONEY_FAIL_EVENT = 'takeMoneyFail';

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

function takeMoney(id, data) {
  superagent
    .put(config.apiRoot + '/cards/' + id + '/balance')
    .send(data)
    .end(function(res) {
      if (res.ok) {
        CardActions.takeMoneySuccess(res.body);
      } else {
        CardActions.takeMoneyFail(res.body);
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
  takeMoney(id, data) {
    takeMoney(id, data);
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
  },
  emitTakeMoneySuccess: function(operation) {
    this.emit(TAKE_MONEY_SUCCESS_EVENT, operation);
  },
  addTakeMoneySuccessListener: function(callback) {
    this.on(TAKE_MONEY_SUCCESS_EVENT, callback);
  },
  removeTakeMoneySuccessListener: function(callback) {
    this.removeListener(TAKE_MONEY_SUCCESS_EVENT, callback);
  },
  emitTakeMoneyFail: function(data) {
    this.emit(TAKE_MONEY_FAIL_EVENT, data);
  },
  addTakeMoneyFailListener: function(callback) {
    this.on(TAKE_MONEY_FAIL_EVENT, callback);
  },
  removeTakeMoneyFailListener: function(callback) {
    this.removeListener(TAKE_MONEY_FAIL_EVENT, callback);
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

    case ActionTypes.CARD_TAKE_MONEY_SUCCESS:
      CardStore.emitTakeMoneySuccess(action.operation);
      break;

    case ActionTypes.CARD_TAKE_MONEY_FAIL:
      CardStore.emitTakeMoneyFail(action.data);
      break;

    default:
      return true;
  }

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = CardStore;
