/** @jsx React.DOM */

'use strict';

var React = require('react'),
    { PropTypes } = React,
    Navbar = require('./components/Navbar.jsx'),
    Link = require('react-router').Link;

var App = React.createClass({
  propTypes: {
    activeRouteHandler: PropTypes.func
  },

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <this.props.activeRouteHandler />
          <div className="navbar-footer">
            <div className="container">
              <p className="text-muted">
                <span>© Pampam</span>
                <span>
                  <Link to="/">Home</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
