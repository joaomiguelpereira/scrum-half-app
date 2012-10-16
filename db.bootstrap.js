var mongoose = require('mongoose'),
    fs = require('fs');


module.exports = function (config) {
    console.log('Bootstraping DB...');
    // Bootstrap db connection
    mongoose.connect(config.db);

    // Bootstrap models
    var models_path = __dirname + '/app/models'
        , model_files = fs.readdirSync(models_path);
    model_files.forEach(function (file) {
        require(models_path + '/' + file)
    });
}

