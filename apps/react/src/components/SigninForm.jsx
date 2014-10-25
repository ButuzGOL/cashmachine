/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var SigninForm = React.createClass({
  getInitialState() {
    return {
      errorMessage: null,
      stage: 0
    }
  },
  getDefaultProps() {
    return {
      cardNumber: '',
      pin: ''
    }
  },
  handleSubmit(e) {
    e.preventDefault();
    var number = this.refs.number.getDOMNode().value.trim();
    this.setState({ stage: 1 });
  },
  handleCancel(e) {
    this.refs.pin.getDOMNode().value = '';
    this.setState({ stage: 0 });
  },
  render() {
    var stageOutput;

    if (this.state.stage === 0) {
      stageOutput = (
        <section>
          <div className="form-group">
            <label for="number" className="col-sm-4 control-label">
              Card number
            </label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="number" name="number" ref="number" />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-4 col-sm-8">
              <button type="submit" className="btn btn-default pull-right">Next</button>
            </div>
          </div>
        </section>
      );
    } else {
      stageOutput = (
        <section>
          <div className="form-group">
            <label for="pin" className="col-sm-4 control-label">Pin</label>
            <div className="col-sm-8">
              <input type="password" className="form-control" name="pin" id="pin" ref="pin" />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-4 col-sm-8">
              <button type="submit" className="btn btn-primary pull-right">Submit</button>
              <button type="button" onClick={this.handleCancel} className="btn btn-default">Cancel</button>
            </div>
          </div>
        </section>
      );
    }

    return (
      <form className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
        { this.state.errorMessage ?
          <p className="bg-danger">{this.state.errorMessage}</p>
          : null}
        {stageOutput}
      </form>
    );
  }
});

module.exports = SigninForm;
