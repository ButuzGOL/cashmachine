/**
 * SessionsController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	signin: function (req, res) {
    var condition = {
      number: Number(req.body.number)
    };

    Cards.findOne(condition, function(err, card) {
      var response = {};

      if (err) {
        return res.badRequest(err);
      } else if (!card) {
        return res.badRequest({ message: 'Wrong data' });
      }

      if (card.blocked) {
        return res.badRequest({ message: 'Card is blocked' });
      }

      if (req.body.pin && card.pin !== Number(req.body.pin)) {
        if (!req.session.signinAttempts) {
          req.session.signinAttempts = 1;
        } else if (req.session.signinAttempts < 2) {
          req.session.signinAttempts++;
        } else {
          delete req.session.signinAttempts;
          card.blocked = true;
          card.save(function(err) {
            if (err) {
              return res.badRequest(err);
            }

            return res.badRequest({ message: 'Card is blocked' });
          });
          return;
        }

        return res.badRequest({ message: 'Wrong data' });
      }

      if (req.body.pin) {
        delete req.session.signinAttempts;
        req.session.cardId = card.id;
        response.sessionId = req.sessionID;
      }

      response.id = card.id;
      return res.send(response);
    });
  },
  signout: function(req, res) {
    req.session.destroy();

    res.json(200);
  }
};
