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

    if (req.body.pin) {
      condition.pin = Number(req.body.pin);
    }

    Cards.findOne(condition, function(err, card) {
      var response = {};

      if (err) {
        return res.badRequest(err);
      } else if (!card) {

        if (!req.session.signinAttempts) {
          req.session.signinAttempts = 1;
        } else if (req.session.signinAttempts < 2) {
          req.session.signinAttempts++;
        } else {
          card.blocked = true;
          card.save(function(err) {
            if (err) {
              return res.badRequest(err);
            }

            return res.badRequest({ message: 'Card is blocked' });
          });
          return;
        }

        return res.badRequest({ message: 'Wrond data' });
      }

      if (card.blocked) {
        return res.badRequest({ message: 'Card is blocked' });
      } else if (condition.pin) {
        req.session.cardId = card.id;
        response.sessionId = req.sessionID;
      }

      response.id = card.id;
      return res.send(response);
    });
  },
};
