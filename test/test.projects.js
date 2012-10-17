var app = require('../app'),
    should = require('should'),
    request = require('./test.utils');
var mongoose = require('mongoose');
var Project = mongoose.model('Project');


var projectDb = require('./dbtest.utils')(Project);

describe('Projects API test suite', function () {

    before(function () {
        console.log("Removing all");
        //Project.removeAll()
    });


    describe('Projects', function () {
        var modelPrototype = {
            name:"Scrum Half"
        }

        it('should return empty list of projects', function (done) {
            projectDb.clean().then(function () {
                request(app)
                    .get('/projects').isJson(done, []);

            });
        });
        it('should return a page of projects', function (done) {

            projectDb.clean().insert(20, modelPrototype).then(function () {
                request(app)
                    .get('/projects').hasObjects(done, 20, 200);

            });
        });


    });


});
