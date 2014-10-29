/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var CardOperationInfo = React.createClass({
  render() {
    return (
      <dl className="dl-horizontal">
        <dt>Id</dt>
        <dd>{ this.props.operation.id }</dd>
        <dt>Code</dt>
        <dd>{ this.props.operation.code }</dd>
      </dl>
    );
  }
});

module.exports = CardOperationInfo;
