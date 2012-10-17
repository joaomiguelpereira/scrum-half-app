var i = require('util').inspect;

var applyRoutes = function (app, config) {
    var routes = require("../app/config/routes");
    console.log("Config: " + config.controllers_path);
    var controller;
    routes.forEach(function (route) {
        console.log("Registering Route: " + i(route));
        var handler_parts = route.handler.split(".");

        var controller_script_path = config.controllers_path + "/" + handler_parts[0];

        controller = require(controller_script_path);

        var fn = controller[handler_parts[1]];

        app[route.method.toLowerCase()](route.path, fn);
    });
}
exports.applyRoutes = applyRoutes;