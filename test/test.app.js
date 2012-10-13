var http = require('./http');
var app = require('../server');
var request = require("supertest");

describe('App Test suite', function () {

    describe('#indexOf()', function () {


        it('should have no posts', function (done) {
            request(app)
                .get('/')
                .end(function (err, res) {
                    res.should.have.status(200);
                    //res.headers.location.should.include('/users');
                    done();
                })
        })
    })
});