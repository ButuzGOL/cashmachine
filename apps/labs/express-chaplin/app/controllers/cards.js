var _ = require('lodash'),
    Card = require('../models/card');

exports.signin = function(req, res) {
  var condition = {
    number: req.body.number
  };

  if (req.body.pin) {
    condition.pin = req.body.pin;
  }

  Card.findOne(condition, function(err, card) {
    if (err) {
      return res.send(err);
    }

    if (card && card.isBlocked) {
      res.send({ message: 'Card is blocked' });
    } else if (card && condition.pin) {
      req.card = card;
      res.send(_.pick(card, '_id', 'accessToken'));
    } else if (card) {
      res.send(_.pick(card, '_id'));
    } else {
      res.send({ message: 'Wrond data' });
    }
  });
};

exports.block = function(req, res) {
  Card.findOne({ number: req.body.number }, function(err, card) {
    if (err) {
      return res.send(err);
    }

    if (!card) {
      res.send({ message: 'Not found' });
      return;
    }

    card.set('isBlocked', true);

    card.save(function() {
      if (err) {
        return res.send(err);
      }

      res.send({ message: 'Card blocked' });
    });
  });
};

exports.me = function(req, res) {
  Card.findOne({ accessToken: req.query.access_token }, function(err, card) {
    if (err) {
      return res.send(err);
    }

    if (!card) {
      res.send({ message: 'Not found' });
      return;
    }

    card.operations.push({
      code: 2
    });

    card.set('operations', card.operations);

    card.save(function() {
      if (err) {
        return res.send(err);
      }

      res.json(_.pick(card, '_id', 'number', 'balance', 'created'));
    });

  });
};

exports.balance = function(req, res) {
  var take = Number(req.body.take);

  Card.findOne({ accessToken: req.query.access_token }, function(err, card) {
    if (err) {
      return res.send(err);
    }

    if (!card) {
      res.send({ message: 'Not found' });
      return;
    }

    if (take < 0) {
      res.send({ message: 'Should be >0' });
      return;
    }

    if (card.balance < take) {
      res.send({ message: 'Not enough balance' });
      return;
    }

    card.set('balance', card.balance - take);

    card.operations.push({
      code: 1
    });

    card.set('operations', card.operations);

    card.save(function() {
      if (err) {
        return res.send(err);
      }

      res.json(_.last(card.operations));
    });
  });
};
