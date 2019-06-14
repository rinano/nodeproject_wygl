var mongoose=require('./../db')
var Schema=mongoose.Schema

var staffSchema =new Schema({
  userid:String,
  password:String,
  name:String,
  phone:Number
},
  {
    collection:'staff'
  
})

module.exports=mongoose.model('staff',staffSchema)