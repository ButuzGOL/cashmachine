/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var DefaultLayout = require('../../layouts/DefaultLayout.jsx');
var CardStore = require('../../stores/CardStore');
var CardActions = require('../../actions/CardActions');
var CardInfo = require('../../components/CardInfo.jsx');

var CardsViewPage = React.createClass({
  getInitialState() {
    return {
      card: null
    };
  },
  getDefaultProps() {
    return {
      title: 'CashMachine Card Info',
      layout: DefaultLayout
    };
  },
  componentDidMount() {
    CardStore.addChangeListener(this._onChange);

    this.requestData();
  },
  componentWillUnmount() {
    CardStore.removeChangeListener(this._onChange);
  },
  requestData() {
    CardActions.fetch('me');
  },
  _onChange() {
    this.setState({
      card: CardStore.get()
    });
  },
  handleClickCardOperations(e) {
    e.preventDefault();
  },
  render() {
    console.log(this.state.card)
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h4>Card Info</h4>
          { this.state.card ? <CardInfo card={this.state.card} /> : null }
          <a href="" onClick={this.handleClickCardOperations}>Operations</a>
        </div>
      </div>
    );
  }
});

module.exports = CardsViewPage;
