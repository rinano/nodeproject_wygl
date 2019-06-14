const adminTable =require('../db/models/admin')
const staffTable = require('../db/models/staff')
const Affair = require('../db/models/affair')
const Msg=require('../db/models/user')

module.exports.login = function(req,res){
  var  id= { 
      userid:req.body.userid,
      password:req.body.password
    }
    var type = 'admin'
  if (req.body.identityType == type){
    adminTable.findOne(id,(err,doc)=>{
      if(err){
        console.log('登录失败')
        return res.render('adminlogin',{errMsg:'登录失败'})
      }else{
        if(doc==null){
          res.render('adminlogin',{errMsg:'用户名密码错误'})
        }else{
          req.session.adminid=req.body.userid
          console.log(doc)
          console.log(req.session)
          return  res.redirect('/')
        }
      }
    })
  } else {
    staffTable.findOne(id,(err,doc)=>{
      if(err){
        console.log('登录失败')
        return res.render('adminlogin',{errMsg:'登录失败'})
      }else{
        if(doc==null){
          res.render('adminlogin',{errMsg:'用户名密码错误'})
        }else{
          req.session.staffid=req.body.userid
          req.session.name=doc.name
          req.session.phone=doc.phone
          console.log(doc)
          console.log(req.session)
          return  res.redirect('/')
        }
      }
    })
  }
}

module.exports.getAff= function(req,res){
  Affair.find((err,doc)=>{
    console.log('找到用户工单')
    return res.send(doc)
  })
}

module.exports.getAffedit=function(req,res){
  var id=req.params.id
  console.log(id)
  Affair.findOne({_id:id},(err,doc)=>{
    res.json(doc)
  })
}


module.exports.delectAff=function(req,res){
  const id =req.params.id
  Affair.findByIdAndDelete(id,(err,doc)=>{
    Msg.findOneAndUpdate({affair:id},{$pull:{affair:id}},(err,doc)=>{
      console.log(doc)
      res.send(doc)
    })
  })
}

module.exports.udAff= function(req,res){
  var id=req.params.id
  if (req.session.phone== null){
    var udStr={
      stat:req.body.stat
    }
    console.log(req.body)
    Affair.findOneAndUpdate({_id:id},udStr,(err,doc)=>{
      res.json(doc)
    })
  } else {
    var udStr={
      stat:req.body.stat,
      adminname:req.session.name,
      adminphone:req.session.phone
    }
    console.log(req.body)
    Affair.findOneAndUpdate({_id:id},udStr,(err,doc)=>{
      res.json(doc)
    })
  }
}