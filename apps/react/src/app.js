/** @jsx React.DOM */

'use strict';

var React = require('react'),
    { PropTypes } = React,
    Navbar = require('./components/Navbar.jsx'),
    Link = require('react-router').Link,
    CurrentPath = require('react-router').CurrentPath,
    AuthStore = require('./stores/AuthStore'),
    jquery = require('jquery'),
    { Navigation } = require('react-router');

window['React'] = React;
window['jQuery'] = jquery;

jquery.ajaxSetup({
  dataType: 'json',
  xhrFields: {
    withCredentials: true
  },
  crossDomain: true
});

var App = React.createClass({
  mixins: [Navigation],
  propTypes: {
    activeRouteHandler: PropTypes.func
  },
  componentWillMount() {
    return this.checkAuth();
  },
  checkAuth() {
    if (AuthStore.isSignin) {
      return true;
    }

    if (['/cards/me', '/cards/me/balance', '/'].indexOf(window.location.hash.slice(1)) !== -1) {
      this.transitionTo('/sessions/new');
      return false;
    } else {
      return true;
    }
  },
  shouldComponentUpdate() {
    return this.checkAuth();
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
