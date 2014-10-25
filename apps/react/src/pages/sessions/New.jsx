/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var DefaultLayout = require('../../layouts/DefaultLayout.jsx');
var SigninForm = require('../../components/SigninForm.jsx');

var HomePage = React.createClass({
  getDefaultProps() {
    return {
      title: 'CashMachine Signin',
      layout: DefaultLayout
    };
  },
  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h4>SignIn</h4>
          <SigninForm />
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
