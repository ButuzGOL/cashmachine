var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionTypes');
var merge = require('react/lib/merge');
var AuthActions = require('../actions/AuthActions');
var config = require('../config');
var superagent = require('superagent');

var SIGNIN_SUCCESS_EVENT = 'signinSuccess';
var SIGNIN_FAIL_EVENT = 'signinFail';

function signin(stage, data) {

  superagent
    .post(config.apiRoot + '/signin')
    .send(data)
    .set('Accept', 'application/json')
    .end(function(res) {
      if (res.ok) {
        AuthActions.signinSuccess(stage);
      } else {
        AuthActions.signinFail(stage, res.body);
      }
    });
}

var AuthStore = merge(EventEmitter.prototype, {
  emitSigninSuccess(stage) {
    this.emit(SIGNIN_SUCCESS_EVENT, stage);
  },
  addSigninSuccessListener(callback) {
    this.on(SIGNIN_SUCCESS_EVENT, callback);
  },
  removeSigninSuccessListener(callback) {
    this.removeListener(SIGNIN_SUCCESS_EVENT, callback);
  },

  emitSigninFail(stage, data) {
    this.emit(SIGNIN_FAIL_EVENT, stage, data);
  },
  addSigninFailListener(callback) {
    this.on(SIGNIN_FAIL_EVENT, callback);
  },
  removeSigninFailListener(callback) {
    this.removeListener(SIGNIN_FAIL_EVENT, callback);
  }
});

AuthStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case ActionTypes.AUTH_SIGNIN:
      signin(action.stage, action.data);
      break;

    case ActionTypes.AUTH_SIGNIN_SUCCESS:
      AuthStore.emitSigninSuccess(action.stage);
      break;

    case ActionTypes.AUTH_SIGNIN_FAIL:
      AuthStore.emitSigninFail(action.stage, action.data);
      break;

    default:
      return true;
  }

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = AuthStore;
