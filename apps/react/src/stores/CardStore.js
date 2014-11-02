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
