var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionTypes');
var merge = require('react/lib/merge');
var AuthActions = require('../actions/AuthActions');
var config = require('../config');
var jquery = require('jquery');

var SIGNIN_SUCCESS_EVENT = 'signinSuccess';
var SIGNIN_FAIL_EVENT = 'signinFail';
var SIGNOUT_SUCCESS_EVENT = 'signoutSuccess';

function signin(stage, data) {

  jquery.post(config.apiRoot + '/signin', data)
    .done(function(data) {
      AuthActions.signinSuccess(stage);
    })
    .fail(function(jqXHR) {
      AuthActions.signinFail(stage, jqXHR.responseJSON);
    });
}

function signout() {

  jquery.get(config.apiRoot + '/signout')
    .done(function() {
      AuthActions.signoutSuccess();
    });
}

var AuthStore = merge(EventEmitter.prototype, {
  isSignin: false,
  signout: signout,
  emitSigninSuccess(stage) {
    this.emit(SIGNIN_SUCCESS_EVENT, stage);
  },
  addSigninSuccessListener(callback) {
    this.on(SIGNIN_SUCCESS_EVENT, callback);
  },
  removeSigninSuccessListener(callback) {
    this.removeListener(SIGNIN_SUCCESS_EVENT, callback);
  },

  emitSignoutSuccess(stage) {
    this.emit(SIGNOUT_SUCCESS_EVENT, stage);
  },
  addSignoutSuccessListener(callback) {
    this.on(SIGNOUT_SUCCESS_EVENT, callback);
  },
  removeSignoutSuccessListener(callback) {
    this.removeListener(SIGNOUT_SUCCESS_EVENT, callback);
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
      AuthStore.isSignin = true;
      AuthStore.emitSigninSuccess(action.stage);
      break;

    case ActionTypes.AUTH_SIGNIN_FAIL:
      AuthStore.emitSigninFail(action.stage, action.data);
      break;

    case ActionTypes.AUTH_SIGNOUT_SUCCESS:
      AuthStore.isSignin = false;
      AuthStore.emitSignoutSuccess();
      break;

    default:
      return true;
  }

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = AuthStore;
