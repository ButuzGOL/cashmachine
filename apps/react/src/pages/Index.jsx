/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/DefaultLayout.jsx');

var HomePage = React.createClass({
  getDefaultProps() {
    return {
      title: 'CashMachine',
      layout: DefaultLayout
    };
  },
  render() {
    return (
      <div className="row">
        <div className="col-sm-4">
          <h4>Menu</h4>
          <ul className="nav nav-pills nav-stacked">
            <li><a href="/cards/me">Card info</a></li>
            <li><a href="/cards/me/balance">Take money</a></li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
