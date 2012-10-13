/**
 * Module dependencies.
 */

var express = require('express')
    , _ = require('underscore')._,
    services = require('./services');

var app = module.exports = express();

app.run = function (config) {

    //Application config
    var config = _.extend({
        port:3000, logger:console
    }, config);


    // Configuration
    app.configure(function () {
        app.use(app.router);
        //Serve public assets
        app.use(express.static(__dirname + '/public/app'));
    });

    app.configure('development', function () {
        app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
    });

    app.configure('production', function () {
        app.use(express.errorHandler());
    });

    // Routes
    app.get('/', function (req, res) {

        res.end("Hello World " + services().prop_1);
    });


    // Listen
    app.listen(config.port, function () {
        config.logger.http("Express server listening on port " + config.port + " in " + app.settings.env + " mode");
    });

    return app;
};