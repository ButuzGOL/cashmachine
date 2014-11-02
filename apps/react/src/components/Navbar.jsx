/** @jsx React.DOM */

'use strict';

var React = require('react');
var { Link, Navigation } = require('react-router');
var AuthStore = require('../stores/AuthStore');
var AuthActions = require('../actions/AuthActions');

var Navbar = React.createClass({
  mixins: [Navigation],
  getInitialState() {
    return this.getSigninState();
  },
  getSigninState() {
    return {
      isSignin: AuthStore.isSignin
    }
  },
  componentDidMount() {
    AuthStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onChange);
  },
  _onChange(stage) {
    this.setState(this.getSigninState());
    if (!this.state.isSignin) {
      this.transitionTo('/sessions/new');
    }
  },
  handleSignout(e) {
    e.preventDefault();
    AuthStore.signout();
  },
  render() {
    return (
      <div className="navbar-top">
        <div className="container">
          <Link className="navbar-brand row" to="/">
            <span>CashMachine</span>
          </Link>
          <ul className="nav navbar-nav">
            { (this.state.isSignin) ?
              <li><a href="#">Home</a></li> : null
            }
          </ul>
          <ul className="nav navbar-nav navbar-right">
            { (this.state.isSignin) ?
              <li><a href="" onClick={this.handleSignout}>Signout</a></li> : null
            }
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = Navbar;
