var DB = require('../../db');
var InvestSchema = new DB.mongoose.Schema({
    account: Number,
    createDate: String,
    returnDate: String,
    interest: Number,
    user: Object
});
module.exports = DB.db.model('invest',InvestSchema);