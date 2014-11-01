/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var addons = require('react-addons');
var CardStore = require('../stores/CardStore');
var { Navigation } = require('react-router');

var TakeMoneyForm = React.createClass({
  mixins: [addons.LinkedStateMixin],
  getInitialState() {
    return {
      errorMessage: null,
      take: 0.00
    }
  },
  handleSubmit(e) {
    e.preventDefault();

    var take = this.refs.take.getDOMNode().value.trim();

    if (!take) {
      return;
    }

    this.props.onTakeMoneySubmit({ take: take });
  },
  componentDidMount() {
    CardStore.addTakeMoneyFailListener(this._onTakeMoneyFail);
  },
  componentWillUnmount() {
    CardStore.removeTakeMoneyFailListener(this._onTakeMoneyFail);
  },
  _onTakeMoneyFail(data) {
    this.setState({ errorMessage: data.message });
  },
  handleCancel(e) {
    Navigation.transitionTo('/');
  },
  render() {
    return (
      <form className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
        { this.state.errorMessage ?
          <p className="bg-danger">{this.state.errorMessage}</p>
          : null }
        <div className="form-group">
          <label for="take" className="col-sm-4 control-label">
            Amount
          </label>
          <div className="col-sm-8">
            <input ref="take" type="text" className="form-control" id="take" name="take" valueLink={this.linkState('take')} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-4 col-sm-8">
            <button type="submit" className="btn btn-primary pull-right">Submit</button>

            <button type="button" onClick={this.handleCancel} className="btn btn-default">Cancel</button>
          </div>
        </div>
      </form>
    );
  }
});

module.exports = TakeMoneyForm;
