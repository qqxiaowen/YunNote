var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/note',{ useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, '连接数据库失败'));
db.once('open', function() {
  // we're connected!
  console.log('连接数据库成功')
});
module.exports = db
