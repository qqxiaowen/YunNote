var mongoose = require('mongoose');
var Schema = mongoose.Schema;

  var article1 = new Schema({
      title:String,
      content:String,
      contentText:String,
      author:{
          type:Schema.Types.ObjectId,
          ref:'user'
      },
      category:{
        type:Schema.Types.ObjectId,
        ref:'category'
      },
      readnumber:{
        type:Number,
        default:0
      },
      commonnumber:{
        type:Array,
        default:[]
      },
    
}, {versionKey: false,timestamps: { createdAt: 'createTime',updatedAt:'updateTime' }})

module.exports = mongoose.model("article", article1)