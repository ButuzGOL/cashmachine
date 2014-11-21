var cards = require('../app/controllers/cards');

module.exports = function(app) {
  app.post('/signin', cards.signin);

  app.get('/cards/me', cards.me);

  app.put('/cards/balance', cards.balance);

  app.put('/cards/block', cards.block);
};