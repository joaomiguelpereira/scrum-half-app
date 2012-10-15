var mongoose = require('mongoose');
var Project = mongoose.model('Project');


exports.list = function (req, res) {

    var project = new Project({ name:'Scrum-hal', releases:10});

    res.json(200, []);


}