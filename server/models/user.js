var DB = require('../../db');
var PersonSchema = new DB.mongoose.Schema({
    realName: String,   //定义一个属性name，类型为String
    loginName: String,  //登录名
    age: Number,
    idNumber: String,
    email: String,
    mobile: String,
    password: String
});
module.exports = DB.db.model('users',PersonSchema);