var userModel = require('../models/userModel');
exports.test = function(req, res) {
    var obj = {
        name: 'bbb',
        age: 6
    }
    userModel.save(obj, function (r){
        res.json({
            a: r
        });
    });
    // console.log('///', a)
    
}



