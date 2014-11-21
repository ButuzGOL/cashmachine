define([
  'mediator'
], function(mediator) {
  'use strict';
  
  return {
    isSignedIn: function() {
      if (mediator.card && mediator.card.get('accessToken')) {
        return true;
      } else {
        return false;
      }
    }
  };

});
