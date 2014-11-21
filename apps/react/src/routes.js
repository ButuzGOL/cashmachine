/** @jsx React.DOM */

'use strict';

var { Route, DefaultRoute, Routes } = require('react-router'),
    App = require('./app'),
    HomePage = require('./pages/Index.jsx'),
    SessionsNew = require('./pages/sessions/New.jsx'),
    CardsView = require('./pages/cards/View.jsx'),
    CardsBalance = require('./pages/cards/Balance.jsx');

module.exports = (
  <Routes location="hash">
    <Route name="app" path="/" handler={App}>
      <Route name="sessions/new" handler={SessionsNew}/>
      <Route name="card" path="cards/me" handler={CardsView}/>
      <Route name="card/balance" path="cards/me/balance" handler={CardsBalance}/>
      <DefaultRoute handler={HomePage}/>
    </Route>
  </Routes>
);
