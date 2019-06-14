var mongoose=require('./../db')
var Schema=mongoose.Schema

var adminSchema =new Schema({
  userid:String,
  password:String
},
  {
    collection:'admin'
  
})

module.exports=mongoose.model('admin',adminSchema)