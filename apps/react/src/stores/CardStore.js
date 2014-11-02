var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionTypes');
var merge = require('react/lib/merge');
var CardActions = require('../actions/CardActions');
var config = require('../config');
var jquery = require('jquery');
var AppActions = require('../actions/AppActions');

var CHANGE_EVENT = 'change';
var TAKE_MONEY_SUCCESS_EVENT = 'takeMoneySuccess';
var TAKE_MONEY_FAIL_EVENT = 'takeMoneyFail';

function fetch(id) {
  jquery.get(config.apiRoot + '/cards/' + id)
    .done(function(data) {
      CardStore.set(data);
      CardActions.changed();
    });
}

function fetchOperations(id) {
  jquery.get(config.apiRoot + '/cards/' + id + '/operations')
    .done(function(data) {
      CardStore.setOperations(data);
      CardActions.changed();
    });
}

function takeMoney(id, data) {

  jquery.ajax({
    url: config.apiRoot + '/cards/' + id + '/balance',
    data: data,
    method: 'PUT'
  }).done(function(data) {
      CardActions.takeMoneySuccess(data);
    })
    .fail(function() {
      CardActions.takeMoneyFail(data);
    });
}

var CardStore = merge(EventEmitter.prototype, {
  card: {
    id: null,
    balance: null,
    operations: []
  },
  fetch: fetch,
  set(data) {
    this.card = merge(this.card, data);
  },
  setOperations(data) {
    this.card.operations = data;
  },

  fetchOperations: fetchOperations,

  takeMoney: takeMoney,

  get() {
    return this.card;
  },

  // TODO: Move this to one 3 general methods
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitTakeMoneySuccess(operation) {
    this.emit(TAKE_MONEY_SUCCESS_EVENT, operation);
  },
  addTakeMoneySuccessListener(callback) {
    this.on(TAKE_MONEY_SUCCESS_EVENT, callback);
  },
  removeTakeMoneySuccessListener(callback) {
    this.removeListener(TAKE_MONEY_SUCCESS_EVENT, callback);
  },

  emitTakeMoneyFail(data) {
    this.emit(TAKE_MONEY_FAIL_EVENT, data);
  },
  addTakeMoneyFailListener(callback) {
    this.on(TAKE_MONEY_FAIL_EVENT, callback);
  },
  removeTakeMoneyFailListener(callback) {
    this.removeListener(TAKE_MONEY_FAIL_EVENT, callback);
  }
});

CardStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
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
