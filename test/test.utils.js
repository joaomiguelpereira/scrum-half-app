/**
 * Module dependencies
 * @param done
 * @param object
 * @return {Function}
 */
var _ = require('underscore'),
    i = require('util').inspect,
    Assertion = require("should").Assertion,
    methods = require('methods')
    , http = require('http'),
    Test = require("supertest/lib/test");

//Override supertest request function
var request = module.exports = function (app) {
    if ('function' == typeof app) app = http.createServer(app);
    var obj = {};

    methods.forEach(function (method) {
        var name = 'delete' == method
            ? 'del'
            : method;

        obj[name] = function (url) {
            return new Test(app, method, url);
        };
    });

    return obj;

}

//Extends Test object
Test.prototype.isJson = function (done, jsonObject, status) {
    this.end(hasJSON(done, jsonObject, status));
}


/**Extends should API**/
Assertion.prototype.sameJSON = function (jsonObject) {
    this.assert(_.isEqual(this.obj, jsonObject),
        function () {
            return "Expected object " + i(this.obj) + " to be equal to " + i(jsonObject)
        },
        function () {
            "Expected object " + i(this.obj) + " not to be equal to " + i(jsonObject)
        }
    );
}

/**
 * Function to assert the presence of JSON
 * @param done
 * @param object
 * @param status
 * @return {Function}
 */
var hasJSON = function (done, object, status) {
    status = status || 200;
    var done = done;
    var jsonObject = object;

    var callbackFunction = function (err, res) {
        res.should.have.status(status);
        res.should.have.property('type', 'application/json');

        var header = res.header;
        var body = res.body;

        header.should.have.property('api-version');
        body.should.be.sameJSON(object);


        done();
    }
    return callbackFunction;
}
