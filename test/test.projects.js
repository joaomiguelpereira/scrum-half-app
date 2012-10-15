var app = require('../api'),
    should = require('should'),
    request = require('./test.utils');

describe('Projects API test suite', function () {

    describe('Projects', function () {
        it('should return empty list of projects', function (done) {
            request(app)
                .get('/projects').isJson(done, []);
        })

    });
});
