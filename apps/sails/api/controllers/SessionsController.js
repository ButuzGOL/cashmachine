/**
 * SessionsController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var _ = require('lodash');

module.exports = {


  /**
   * Action blueprints:
   *    `/sessions/signin`
   */
   signin: function (req, res) {
    var condition = {
      number: Number(req.body.number)
    };

    if (req.body.pin) {
      condition.pin = Number(req.body.pin);
    }

    Cards.findOne(condition, function(err, card) {
      if (err) {
        return res.send(500, err);
      } else if (!card) {
        return res.send({ message: 'Wrond data' });
      }

      if (card.blocked) {
        return res.send({ message: 'Card is blocked' });
      } else if (condition.pin) {
        req.session.card = card.id;
      }

      return res.send(_.pick(card, 'id'));
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SessionsController)
   */
  _config: {}


};
