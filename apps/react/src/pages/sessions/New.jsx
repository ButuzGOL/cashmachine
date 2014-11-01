/** @jsx React.DOM */

'use strict';

var React = require('react');
var SigninForm = require('../../components/SigninForm.jsx');

var SessionsNewPage = React.createClass({
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

module.exports = SessionsNewPage;
