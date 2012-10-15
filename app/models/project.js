var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name:String,
    releases:Number
});
console.log('Registering Model Project...');
mongoose.model('Project', ProjectSchema);
