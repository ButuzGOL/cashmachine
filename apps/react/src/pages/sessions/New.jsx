/** @jsx React.DOM */

'use strict';

var React = require('react');
var SigninForm = require('../../components/SigninForm.jsx');

var SessionsNewPage = React.createClass({
  render() {
    return (
      <div className="row">
        <div className="col-md-9 col-md-offset-3">
          <SigninForm />
        </div>
      </div>
    );
  }
});

module.exports = SessionsNewPage;
