var express = require('express'),
    http = require('http'),
    log = require('./lib/log')(module),

    env = process.env.NODE_ENV || 'development',
    config = require('./config/environment')[env],
    app,
    port;

require('./config/mongoose')(config);

app = express();
// express settings
require('./config/express')(app, config);

// Bootstrap routes
require('./config/routes')(app);

// Start the app by listening on <port>
port = process.env.PORT || config.port || 3000;
http.createServer(app).listen(port, function() {
  log.info('CashMachine app running on port ' + port);
});

exports = module.exports = app;