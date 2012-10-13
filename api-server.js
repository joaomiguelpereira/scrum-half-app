var DEFAULT_PORT_NUMBER = 3001;

var express = require('express')
    , http = require('http')
    , path = require('path');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || DEFAULT_PORT_NUMBER);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});

// create an error with .status. we
// can then use the property in our
// custom error handler (Connect repects this prop as well)

function error(status, msg) {
    var err = new Error(msg);
    err.status = status;
    return err;
}

// if we wanted to supply more than JSON, we could
// use something similar to the content-negotiation
// example.

// here we validate the API key,
// by mounting this middleware to /api
// meaning only paths prefixed with "/api"
// will cause this middleware to be invoked

app.use('/api', function (req, res, next) {
    var key = req.query['api-key'];

    // key isnt present
    if (!key) return next(error(400, 'api key required'));

    // key is invalid
    if (!~apiKeys.indexOf(key)) return next(error(401, 'invalid api key'));

    // all good, store req.key for route access
    req.key = key;
    next();
});

// position our routes above the error handling middleware,
// and below our API middleware, since we want the API validation
// to take place BEFORE our routes
app.use(app.router);

// middleware with an arity of 4 are considered
// error handling middleware. When you next(err)
// it will be passed through the defined middleware
// in order, but ONLY those with an arity of 4, ignoring
// regular middleware.
app.use(function (err, req, res, next) {
    // whatever you want here, feel free to populate
    // properties on `err` to treat it differently in here.
    res.send(err.status || 500, { error:err.message });
});

//Serve public assets
app.use(express.static(__dirname + '/public/app'));

// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use(function (req, res) {
    res.send(404, { error:"Lame, can't find that" });
});

var projects = [
    { name:'tobi' }
    ,
    { name:'loki' }
    ,
    { name:'jane' }
];

// we now can assume the api key is valid,
// and simply expose the data

app.get('/api/projects', function (req, res, next) {
    res.send(projects);
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

