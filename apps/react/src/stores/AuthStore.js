var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionTypes');
var merge = require('react/lib/merge');
var AuthActions = require('../actions/AuthActions');
var config = require('../config');
var jquery = require('jquery');

var CHANGE_EVENT = 'change';
var SIGNIN_FAIL_EVENT = 'signinFail';

function signin(data) {

  jquery.post(config.apiRoot + '/signin', data)
    .done(function(data) {
      if (AuthStore.stage === 1) {
        AuthStore.isSignin = true;
      } else {
        AuthStore.stage = 1;
      }

      AuthActions.changed();
    })
    .fail(function(jqXHR) {
      AuthActions.signinFail(jqXHR.responseJSON);
    });
}

function signout() {

  jquery.get(config.apiRoot + '/signout')
    .done(function() {
      AuthStore.stage = 0;
      AuthStore.isSignin = false;
      AuthActions.changed();
    });
}

var AuthStore = merge(EventEmitter.prototype, {
  isSignin: false,
  signin: signin,
  signout: signout,
  stage: 0,

  emitSigninFail(data) {
    this.emit(SIGNIN_FAIL_EVENT, data);
  },
  addSigninFailListener(callback) {
    this.on(SIGNIN_FAIL_EVENT, callback);
  },
  removeSigninFailListener(callback) {
    this.removeListener(SIGNIN_FAIL_EVENT, callback);
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AuthStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case ActionTypes.AUTH_SIGNIN_FAIL:
      AuthStore.emitSigninFail(action.data);
      break;

    case ActionTypes.AUTH_CHANGED:
      AuthStore.emitChange();
      break;

    default:
      return true;
  }

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = AuthStore;
