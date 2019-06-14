var mongoose=require('./../db')
var Schema=mongoose.Schema


var userSchema =new Schema({
  userid:String,
  password:String,
  name:String,
  unit:Number,
  room:Number,
  phone:Number,
  msg:String,
  affair:[String],
  electric:Number
},
  {
    collection:'user'
  
})

module.exports=mongoose.model('user',userSchema)