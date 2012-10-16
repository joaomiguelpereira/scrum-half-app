/**
 * Module dependencies
 */

var express = require('express');

//Environment in which the application is running
var env = process.env.NODE_ENV || 'development'

//Load configuration for current configured environment
var config = require('./app/config/config')[env];

//Create an express application
var app = module.exports = express();

//Bootstrap DB
var dbBoot = require('./db.bootstrap');
dbBoot(config);
/*
 * Load the routes from module routes.
 * Module routes is a function that loads
 */
var loadRoutes = function (app, config) {
    require('./routes')(app);
}
// settings

// define a custom res.message() method
// which stores messages in the session
app.response.message = function (msg) {
    // reference `req.session` via the `this.req` reference
    var sess = this.req.session;
    // simply add the msg to an array for later
    sess.messages = sess.messages || [];
    sess.messages.push(msg);
    return this;
};

// log
if (!module.parent) app.use(express.logger('dev'));

// serve static files
app.use(express.static(__dirname + '/public'));

// session support
app.use(express.cookieParser('some secret here'));
app.use(express.session());

// parse request bodies (req.body)
app.use(express.bodyParser());

// support _method (PUT in forms etc)
app.use(express.methodOverride());

// expose the "messages" local variable when views are rendered
app.use(function (req, res, next) {
    var msgs = req.session.messages || [];

    // expose "messages" local variable
    res.locals.messages = msgs;

    // expose "hasMessages"
    res.locals.hasMessages = !!msgs.length;

    /* This is equivalent:
     res.locals({
     messages: msgs,
     hasMessages: !! msgs.length
     });
     */

    // empty or "flush" the messages so they
    // don't build up
    req.session.messages = [];
    next();
});
app.use(function (req, res, next) {
    //res.setHeader({"API version": 10});
    res.setHeader("API-version", "0.01");
    next();
});

// assume "not found" in the error msgs
// is a 404. this is somewhat silly, but
// valid, you can do whatever you like, set
// properties, use instanceof etc.
app.use(function (err, req, res, next) {
    // treat as 404
    if (~err.message.indexOf('not found')) return next();
    // log it
    console.error(err.stack);
    res.json(500, {message:"Something bad happened"});
});

//Load routes for the application
loadRoutes(app, config);

//If nor route was found, assume 404
app.use(function (req, res, next) {
    res.json(404, {message:"Could not find the resource"});
});


if (!module.parent) {
    app.listen(3000);
    console.log('\n  listening on port 3000\n');
}