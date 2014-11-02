'use strict';

var AppDispatcher = require('../AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var AuthActions = {

  signinFail(data) {
    AppDispatcher.handleServerAction({
      actionType: ActionTypes.AUTH_SIGNIN_FAIL,
      data: data
    });
  },
  changed() {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.AUTH_CHANGED
    });
  }
};

module.exports = AuthActions;
