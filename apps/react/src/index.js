'use strict';

var React = require('react'),
    routes = require('./routes');

window['React'] = React;

React.renderComponent(routes, document.body);
