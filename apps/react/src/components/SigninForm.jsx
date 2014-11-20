/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var AuthActions = require('../actions/AuthActions');
var AuthStore = require('../stores/AuthStore');
var addons = require('react-addons');
var merge = require('react/lib/merge');
var { Navigation } = require('react-router');

function getAuthState() {
  return {
    stage: AuthStore.stage
  };
}

var SigninForm = React.createClass({
  mixins: [addons.LinkedStateMixin, Navigation],
  getInitialState() {
    return merge({
      errorMessage: null,

      number: '',
      pin: ''
    }, getAuthState());
  },
  componentDidMount() {
    AuthStore.addSigninFailListener(this._onSigninFail);
    AuthStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    AuthStore.removeSigninFailListener(this._onSigninFail);
    AuthStore.removeChangeListener(this._onChange);
  },
  _onSigninFail(data) {
    if (data.message) {
      this.setState({ errorMessage: data.message });
    }
  },
  _onChange() {
    if (AuthStore.isSignin) {
      this.transitionTo('/');
      return;
    }

    this.setState(merge({
      errorMessage: null,
      stage: AuthStore.stage
    }, getAuthState()));
  },
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.stage === 0) {
      AuthStore.signin({ number: this.state.number });
    } else {
      AuthStore.signin({
        number: this.state.number,
        pin: this.state.pin
      });
    }
  },
  handleCancel(e) {
    AuthStore.stage = 0;
    this.setState(merge({ pin: '' }, getAuthState() ));
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
              <input type="text" className="form-control" id="number" name="number" ref="number" valueLink={this.linkState('number')} />
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
          <div className="alert alert-danger">{this.state.errorMessage}</div>
          : null }
        {stageOutput}
      </form>
    );
  }
});

module.exports = SigninForm;
