var app = require('../app'),
    should = require('should'),
    request = require('./test.utils');

describe('API Test Suit', function () {

    describe('Root API', function () {


        it('should return 404 when resource not found', function (done) {
            request(app)
                .get('/').isJson(done, {message:"Could not find the resource"}, 404);
        });

        it("should return version", function (done) {
            request(app).get("/version").isJson(done, {version:'0.001'});
        });

    });


});