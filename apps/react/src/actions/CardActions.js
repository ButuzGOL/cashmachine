'use strict';

var AppDispatcher = require('../AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var CardActions = {
  fetch: function(id) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.CARD_FETCH,
      id: id
    });
  },
  changed: function(data) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.CARD_CHANGED,
      data: data
    });
  },
  takeMoneySuccess: function(operation) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.CARD_TAKE_MONEY_SUCCESS,
      operation: operation
    });
  },
  takeMoneyFail: function(data) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.CARD_TAKE_MONEY_FAIL,
      data: data
    });
  }
};

module.exports = CardActions;
