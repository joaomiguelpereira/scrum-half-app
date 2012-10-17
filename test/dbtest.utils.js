var wrapMongooseModel = function (model, prototype) {

    console.log('Wrapping mongoose model for testing');
    //If the db needs to be cleaned during preparation
    var _cleanDB = false;

    /**
     * Clean the db
     * @param done
     */
    var $clean = function (done) {
            model.find({}, function (err, coll) {
                coll.forEach(function (project) {
                    project.remove();
                });
                done();
            });
        }, $createDummyObject = function () {
            var name;
            return _prototype;
        },
        _insertNbrRecords = 0, _prototype = {};

    var wrapper = {
        clean:function () {
            _cleanDB = true;
            return this;
        },
        insert:function (nbrRecords, prototype) {
            _prototype = prototype;
            _insertNbrRecords = nbrRecords;
            return this;
        },
        then:function (done) {
            if (_cleanDB) {
                $clean(function () {
                    if (_insertNbrRecords > 0) {
                        var record = $createDummyObject();
                        var modelInstance = new model(record);
                        modelInstance.save(function () {
                            done();
                        });

                    } else {
                        done();
                    }
                });
            } else {
                if (_insertNbrRecords > 0) {

                    var record = $createDummyObject();
                    var modelInstance = new model(record);

                    modelInstance.save(function () {
                        done();
                    });
                } else {
                    done();
                }

            }


        }

    }
    return wrapper;
}
module.exports = wrapMongooseModel;