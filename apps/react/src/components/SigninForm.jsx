/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var AuthActions = require('../actions/AuthActions');
var AuthStore = require('../stores/AuthStore');
var RouteActions = require('../actions/RouteActions');
var addons = require('react-addons');

var SigninForm = React.createClass({
  mixins: [addons.LinkedStateMixin],
  getInitialState() {
    return {
      errorMessage: null,
      stage: 0,

      number: '',
      pin: ''
    }
  },
  componentDidMount() {
    AuthStore.addSigninSuccessListener(this._onSigninSuccess);
    AuthStore.addSigninFailListener(this._onSigninFail);
  },
  componentWillUnmount() {
    AuthStore.removeSigninSuccessListener(this._onSigninSuccess);
    AuthStore.removeSigninFailListener(this._onSigninFail);
  },
  _onSigninSuccess(stage) {
    if (stage === 0) {
      this.setState({
        errorMessage: null,
        stage: 1
      });
    } else if (stage === 1) {
      setTimeout(function() {
        RouteActions.setRoute('/');
      }, 1);
    }
  },
  _onSigninFail(stage, data) {
    if (data.message) {
      this.setState({ errorMessage: data.message });
    }
  },
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.stage === 0) {
      AuthActions.signin(this.state.stage, {
        number: this.state.number
      });
    } else {
      AuthActions.signin(this.state.stage, {
        number: this.state.number,
        pin: this.state.pin
      });
    }
  },
  handleCancel(e) {
    this.setState({ stage: 0, pin: '' });
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
              <input type="text" className="form-control" id="number" name="number" valueLink={this.linkState('number')} />
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
              <input type="password" className="form-control" id="pin" name="pin" valueLink={this.linkState('pin')} />
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
