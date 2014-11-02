'use strict';

var AppDispatcher = require('../AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var CardActions = {
  changed(data) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.CARD_CHANGED,
      data: data
    });
  },
  takeMoneySuccess(operation) {
    AppDispatcher.handleServerAction({
      actionType: ActionTypes.CARD_TAKE_MONEY_SUCCESS,
      operation: operation
    });
  },
  takeMoneyFail(data) {
    AppDispatcher.handleServerAction({
      actionType: ActionTypes.CARD_TAKE_MONEY_FAIL,
      data: data
    });
  }
};

module.exports = CardActions;
