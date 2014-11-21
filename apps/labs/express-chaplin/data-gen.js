var faker = require('Faker'),
    _ = require('lodash'),
    mongoose = require('mongoose'),
    
    log = require('./lib/log')(module),
    env = 'development',
    config = require('./config/environment')[env],

    Card = require('./app/models/card');

require('./config/mongoose')(config);

Card.remove({}, function(err) {
  var card = new Card({
    number: '1111111111111111',
    pin: '1111',
    balance: '100'
  }),
  card1;

  card.save(function(err, card) {
      if (err) {
        return log.error(err);
      } else {
        log.info('New card - %s:%s', card.number, card.balance);
      }
  });

  card1 = new Card({
    number: '2222222222222222',
    pin: '2222',
    balance: '100',
    isBlocked: true
  });

  card1.save(function(err, card) {
      if (err) {
        return log.error(err);
      } else {
        log.info('New card - %s:%s', card.number, card.balance);
      }
  });
});


_.delay(function() {
  mongoose.disconnect();
}, 3000);