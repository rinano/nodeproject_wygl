var mongoose=require('./../db')
var Schema=mongoose.Schema

var userSchema =new Schema({
  affair:String,
  date:{type:Date,default:Date.now},
  stat:String,
  adminname:String,
  adminphone:Number
},
  {
    collection:'affair'
  
})

module.exports=mongoose.model('affiar',userSchema)