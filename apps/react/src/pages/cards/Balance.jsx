/** @jsx React.DOM */

'use strict';

var React = require('react');
var TakeMoneyForm = require('../../components/TakeMoneyForm.jsx');
var CardStore = require('../../stores/CardStore');
var CardOperationInfo = require('../../components/CardOperationInfo.jsx');

var CardsBalancePage = React.createClass({
  getInitialState() {
    return {
      operation: null
    }
  },
  handleTakeMoneySubmit(data) {
    CardStore.takeMoney('me', data)
  },
  componentDidMount() {
    CardStore.addTakeMoneySuccessListener(this._onTakeMoneySuccess);
  },
  componentWillUnmount() {
    CardStore.removeTakeMoneySuccessListener(this._onTakeMoneySuccess);
  },
  _onTakeMoneySuccess(operation) {
    this.setState({ operation: operation });
  },
  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h4>Take money</h4>
          { this.state.operation ?
            <CardOperationInfo operation={this.state.operation} />
            :
            <TakeMoneyForm onTakeMoneySubmit={this.handleTakeMoneySubmit} />
          }
        </div>
      </div>
    );
  }
});

module.exports = CardsBalancePage;
