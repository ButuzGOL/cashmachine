/** @jsx React.DOM */

'use strict';

var React = require('react');
var { Link } = require('react-router');

var HomePage = React.createClass({
  render() {
    return (
      <div className="row">
        <div className="col-sm-4">
          <h4>Menu</h4>
          <ul className="nav nav-pills nav-stacked">
            <li>
              <Link to="card" params={{id: 'me'}}>
                Card info
              </Link>
            </li>
            <li>
              <Link to="card/balance" params={{id: 'me'}}>
                Take money
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
