var mongoose = require('mongoose'),
    uid = require('uid');

var CardSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true
  },
  pin: {
    type: Number,
    required: true
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  balance: {
    type: Number,
    default: 0
  },
  accessToken: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  operations: [{
    code: {
      type: Number,
      enum: [1, 2, 3],
      required: true
    },
    created: {
      type: Date,
      default: Date.now
    },
  }]
});

CardSchema.pre('save', function(next) {
  if (!this.accessToken) {
    this.accessToken = uid(10);
  }

  next();
});

module.exports = mongoose.model('Card', CardSchema);