var async = require('async'),
    sails = require('sails');

sails.lift({
  log: {
    level: 'silent'
  }
}, function() {
  var cards = [];

  cards[0] = function(cb) {
    Cards.create({
      number: 111111111,
      pin: 111,
      balance: 10000
    }, function(err, card) {
      console.log(card)
      cb();
    });
  };

  cards[1] = function(cb) {
    Cards.create({
      number: 222222222,
      pin: 222,
      balance: 20000
    }, function(err, card) {
      console.log(card)
      cb();
    });
  };

  Cards.destroy({}, function() {
    async.parallel(cards, function() {
      process.exit();
    });
  });
});
