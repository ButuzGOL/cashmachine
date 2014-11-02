/** @jsx React.DOM */

'use strict';

var React = require('react');

var CardInfo = React.createClass({
  render() {
    return (
      <dl className="dl-horizontal">
        <dt>Id</dt>
        <dd>{ this.props.card.id }</dd>
        <dt>Balance</dt>
        <dd>{ this.props.card.balance }</dd>
      </dl>
    );
  }
});

module.exports = CardInfo;
