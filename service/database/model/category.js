var mongoose = require('mongoose');
var Schema = mongoose.Schema;

  var categories = new Schema({
   catename:String
   
}, {versionKey: false,timestamps: { createdAt: 'createTime',updatedAt:'updateTime' }})

module.exports = mongoose.model("category", categories)