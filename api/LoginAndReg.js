const UserTable = require('../db/models/user')


//注册
module.exports.register = function(req,res){
  var name=req.body.name,
      userid=req.body.userid,
      password=req.body.password,
      unit=req.body.unit,
      room=req.body.room,
      phone=req.body.phone
  var regUser= new UserTable({
    name:req.body.name,
    userid:req.body.userid,
    password:req.body.password,
    unit:req.body.unit,
    room:req.body.room,
    phone:req.body.phone
  })

  UserTable.findOne({userid:userid},(err,doc)=>{
    if(err){
      console.log('网络错误')
      return res.render('register',{errorMsg:'网络错误'})
    }else if(doc){
      console.log('重复用户名')
      return res.render('register',{errorMsg:'用户名已存在'})
    }else{
      regUser.save((err2,doc2)=>{
        if(err2){
          console.log('注册失败')
          return res.render('register',{errMsg:'注册失败'})
        }else{
          console.log('成功')
          return res.render('login',{msg:'注册成功'})
        }
      })
    }
  })

}


//登录
module.exports.login = function(req,res){
  var userid=req.body.userid,
      password=req.body.password
  UserTable.findOne({userid:userid,password:password},(err,doc)=>{
    if(err){
      console.log('登录失败')
      return res.send({'code':0})
    }else{
      if(doc==null){
         res.render('login',{errMsg:'登录失败'})
      }else{
        req.session.userid=req.body.userid
        req.session.name=doc.name
        console.log(req.session)
        return res.redirect('/')
      }
    }
  })
}

//注销

module.exports.logout=function(req,res,next){
  /*
  if(req.session.userid != null){
    req.session.userid= null
    return res.redirect('/')
  }
  if(req.session.adminid != null){
    req.session.adminid= null
    return res.redirect('/')
  }
  if(req.session.staffid != null){
    req.session.staffid= null
    return res.redirect('/')
  }
  */

 req.session.adminid= null
 req.session.staffid= null
 req.session.userid= null
 return res.redirect('/')
}