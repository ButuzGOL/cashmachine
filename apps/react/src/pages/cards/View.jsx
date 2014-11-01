/** @jsx React.DOM */

'use strict';

var React = require('react');
var CardStore = require('../../stores/CardStore');
var CardActions = require('../../actions/CardActions');
var CardInfo = require('../../components/CardInfo.jsx');
var CardOperationInfo = require('../../components/CardOperationInfo.jsx');

var CardsViewPage = React.createClass({
  getInitialState() {
    return {
      card: null,
      showOperations: false
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
    CardActions.fetch(this.props.params.id);
  },
  _onChange() {
    this.setState({
      card: CardStore.get()
    });
  },
  handleClickCardOperations(e) {
    e.preventDefault();

    this.setState({ showOperations: true });
    CardStore.fetchOperations(this.props.params.id);
  },
  render() {

    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h4>Card Info</h4>
          { this.state.card ? <CardInfo card={this.state.card} /> : null }

          { !this.state.showOperations ?
            <a href="" onClick={this.handleClickCardOperations}>Operations</a> : this.renderOperations() }

        </div>
      </div>
    );
  },
  renderOperations() {
    var operationNodes = this.state.card.operations.map(function(operation) {
      return (
        <CardOperationInfo operation={operation} />
      );
    });
    return (
      <div>
        <h5>Operations</h5>
        {operationNodes}
      </div>
    );
  }
});

module.exports = CardsViewPage;
