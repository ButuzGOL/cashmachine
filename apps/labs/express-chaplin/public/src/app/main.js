// Configure the AMD module loader
require.config({
  // The path where your JavaScripts are located
  baseUrl: './app/',
  // For easier development, disable browser caching
  // Of course, this should be removed in a production environment
  // urlArgs: 'bust=' +  (new Date()).getTime(),
  // Specify the paths of vendor libraries
  paths: {
    jquery: '../components/scripts/jquery/jquery',
    underscore: '../components/scripts/lodash/lodash',
    backbone: '../components/scripts/backbone/backbone',
    jade: '../components/scripts/jade/jade',
    text: '../components/scripts/requirejs-text/text',
    json: '../components/scripts/requirejs-plugins/json',
    chaplin: '../components/scripts/chaplin/chaplin',

    nprogress: '../components/scripts/nprogress/nprogress',

    semantic: '../components/scripts/semantic-ui/semantic'
  },
  // Underscore and Backbone are not AMD-capable per default,
  // so we need to use the AMD wrapping of RequireJS
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    nprogress: {
      deps: ['jquery']
    }
  }
});

// Bootstrap the application
require(['application', 'routes', 'config/application'],
  function(Application, routes, applicationConfig) {
    new Application({
      routes: routes,
      controllerSuffix: applicationConfig.controllerSuffix
    });
  }
);

window.log = function() {
  try {
    return console.log.apply(console, arguments);
  } catch (_error) {}
};