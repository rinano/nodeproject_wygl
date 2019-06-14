const User= require('../db/models/user')
const Affair = require('../db/models/affair')

const Staff =require('../db/models/staff')
console.log('开始插入数据')
/*
User.findOne({userid:'test123'},(err,doc)=>{
  console.log(doc.affair)
  Affair.find({_id:{$in:doc.affair}},(err,doc)=>{
    console.log(doc)
  })
})
*/
User.findOne({affair:'5ce240b7a21c970f267b5c36'},(err,doc)=>{
  console.log(doc)
})
var id ={
  userid:"sf123",
  password:"123233",
  name:"秦吏",
  phone:"18611001234"
}

Staff.create(id,(err,doc)=>{
  console.log(doc)
})