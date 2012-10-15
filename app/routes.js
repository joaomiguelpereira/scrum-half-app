//Boostrat DB models
var dbBoot = require('../db.bootstrap'),
    fs = require('fs');

var loadRoutes = module.exports = function (app, config) {

    dbBoot(config);

    var applicationController = require('./controllers/application'),
        projectsController = require('./controllers/projects');

    console.log('Loading routes...');
    app.get("/version", applicationController.version);
    app.get("/projects", projectsController.list);


}
