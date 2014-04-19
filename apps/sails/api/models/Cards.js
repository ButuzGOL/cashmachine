/**
* Cards.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    number: {
      type: 'integer',
      required: true,
      unique: true
    },
    pin: {
      type: 'integer',
      required: true
    },
    blocked: {
      type: 'boolean',
      defaultsTo: false
    },
    balance: {
      type: 'float',
      defaultsTo: 0
    },
    operations: {
      collection: 'cardoperations',
      via: 'owner'
    }
  }

};
