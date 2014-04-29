/**
 * CardsController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var _ = require('lodash'),
    async = require('async');

var _before = function(req, res) {
  if (!req.session.cardId) {
    return res.forbidden('Not authorized');
  }
  return true;
};

module.exports = {

  me: function(req, res) {
    if (_before(req, res) !== true) {
      return;
    }

    Cards.findOne(req.session.cardId).done(function(err, card) {
      if (err) {
        return res.badRequest(err);
      }

      if (!card) {
        return res.notFound();
      }

      CardOperations.create({ code: 1, owner: card.id }).done(function(err) {
        if (err) {
          return res.badRequest(err);
        }

        res.json(_.pick(card, 'id', 'balance'));
      });

    });
  },

  balance: function(req, res) {
    if (_before(req, res) !== true) {
      return;
    }

    var take = Number(req.body.take);

    Cards.findOne(req.session.cardId).done(function(err, card) {
      var saveFn, operationCreateFn;

      if (err) {
        return res.badRequest(err);
      }

      if (!card) {
        return res.notFound();
      }

      if (take > card.balance) {
        return res.badRequest({ message: 'Not enough balance' });
      } else if (take <= 0) {
        return res.badRequest({ message: 'Should be more than zero' });
      }

      card.balance -= take;

      saveFn = function(done) {
        card.save(function(err) {
          if (err) {
            return res.badRequest(err);
          }
          done();
        });
      };

      operationCreateFn = function(done) {
        CardOperations.create({ code: 2, owner: card.id }).done(function(err) {
          if (err) {
            return res.badRequest(err);
          }

          done();
        });
      };

      async.parallel([saveFn, operationCreateFn], function() {
          res.send(200);
      });

    });
  },

  operations: function(req, res) {
    if (_before(req, res) !== true) {
      return;
    }

    Cards.findOne(req.session.cardId).populate('operations').done(
      function(err, card) {
        if (err) {
          return res.badRequest(err);
        }

        if (!card) {
          return res.notFound();
        }

        res.json(card.operations);
      }
    );
  }
};
