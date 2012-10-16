/**
 * Module dependencies
 */

var fs = require('fs');

/**
 * Create a route object
 * @param path
 * @param dispatch_to
 * @return {Object}
 */
var createRoute = function (method, path, dispatch_to) {

    var route = {
        method:method,
        path:path,
        dispatch_to:dispatch_to,

        toString:function () {
            return this.method + " " + this.path + " --> " + this.dispatch_to;

        }
    }
    return route;

}
/**
 * Routes
 * @type {Array}
 */
var routes = [createRoute("GET", "/projects", "projectsCtrl.list"),
    createRoute("GET", "/version", "applicationCtrl.version")
];

module.exports = function (app) {
    var controller;
    routes.forEach(function (route) {
        console.log("Loading Route: " + route);
        var config = route.dispatch_to.split(".");
        var controller_script_path = __dirname + "/app/controllers/" + config[0];
        controller = require(controller_script_path);
        var fn = controller[config[1]];

        app[route.method.toLowerCase()](route.path, fn);
    });

}