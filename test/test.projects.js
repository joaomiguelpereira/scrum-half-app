var app = require('../app'),
    should = require('should'),
    request = require('./test.utils');
var mongoose = require('mongoose');
var Project = mongoose.model('Project');

describe('Projects API test suite', function () {
    before(function () {
        console.log("Removing all");
        Project.removeAll()
    });


    describe('Projects', function () {
        it('should return empty list of projects', function (done) {
            request(app)
                .get('/projects').isJson(done, []);
        })

    });
});
