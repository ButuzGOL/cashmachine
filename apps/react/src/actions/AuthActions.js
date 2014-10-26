'use strict';

var AppDispatcher = require('../AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var AuthActions = {
  signin: function(stage, data) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.AUTH_SIGNIN,
      stage: stage,
      data: data
    });
  },
  signinSuccess: function(stage) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.AUTH_SIGNIN_SUCCESS,
      stage: stage
    });
  },
  signinFail: function(stage, data) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.AUTH_SIGNIN_FAIL,
      stage: stage,
      data: data
    });
  }
};

module.exports = AuthActions;
