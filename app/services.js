/*
 var myFunction = function() {
 console.log('Calling myFunction');
 }

 exports.myFunction = myFunction;*/


var services = module.exports = function () {
    return {
        prop_1:function () {
            return 'From function-->';
        }()
    }
};
