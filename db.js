var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/P2P');

db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
  //一次打开记录
  console.log('> 数据库已连接')
});

module.exports = {
    mongoose: mongoose,
    db: db
};