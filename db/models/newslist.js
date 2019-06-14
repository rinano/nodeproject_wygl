var mongoose=require('./../db')
var Schema=mongoose.Schema

var newsSchema =new Schema({
  news:String,
  title:String,
  date:{type:Date,default:Date.now},
},
  {
    collection:'news'
  
})

module.exports=mongoose.model('news',newsSchema)