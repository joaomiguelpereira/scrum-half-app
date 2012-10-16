var mongoose = require('mongoose');
var Project = mongoose.model('Project');

exports.list = function (req, res) {
    Project.findAll(function (err, projects) {
        res.json(200, projects);
    });
};

exports.create = function (req, res) {
    console.log("Creating new project");
}