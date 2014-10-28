'use strict';

var AppDispatcher = require('../AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var AppActions = {
  requestFail: function() {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.REQUEST_FAIL
    });
  }
};

module.exports = AppActions;
