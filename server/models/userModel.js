var PersonModel = require('./user');
exports.save = function (obj, callback){
    console.log(12312312);
    var personEntity = new PersonModel(obj);
    var rel = personEntity.save(); 
    callback(rel);
}
exports.update = function (){
    
}



// blog1.save(function(err) {  //存储
//   if (err) {
//     console.log('save failed');
//   }
//   console.log('save success');
// });

// Blog.find({id:4},function(err,docs){//查询id为4的记录
//      console.log(docs);
//      console.log('find success');
// });

// Blog.update({id:4,title:"upill"},function(err,docs){//更新
//      console.log(docs);
//      console.log('update success');
// });

// Blog.remove({id:4},function(err,docs){//删除id为4的记录
//      console.log(docs);
//      console.log('remove success');
// });