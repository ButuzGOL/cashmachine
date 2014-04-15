/**
 * Cards
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
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
  	operations: [{
      code: {
        type: 'integer',
        enum: [1, 2, 3],
        required: true
      },
      created: {
        type: 'datetime',
        defaultsTo: Date.now
      }
    }]
  }

};
