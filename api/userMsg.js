const Msg=require('../db/models/user')

module.exports.getMsg = function(req,res){
  Msg.findOne({userid:req.session.userid},(err,doc)=>{
    console.log(doc)
    return res.send(doc)
  })
}

module.exports.updateMsg=function(req,res,next){
  const  userid=req.session.userid


  const updateStat={
    $set:{
      name:req.body.name,
      unit:req.body.unit,
      room:req.body.room,
      phone:req.body.phone
    }
  }
  const ids={
    userid:userid,
  }

  Msg.update(ids,updateStat,(err,doc)=>{
    console.log(userid)
    console.log(req.body)
    if(err){
      return res.send({errMsg:'更新失败'})
    }else{
      console.log(doc)
      return res.send({msg:'更新成功'})
    }
  })

}

module.exports.modifyPasswd=function(req,res,next){
  const  userid=req.session.userid
         password=req.body.password
  const updateStat={
    $set:{
      password:req.body.newpasswd
    }
  }
  const ids={
    userid:userid,
  }
  Msg.findOne({password:password},(err,doc)=>{
    if(doc){
      Msg.update(ids,updateStat,(err,doc)=>{
        console.log(userid)
        console.log(req.body)
        if(err){
          return res.send({errMsg:'修改密码失败'})
        }else{
          console.log(doc)
          return res.send({msg:'修改密码成功'})
        }
      })
    }else{
      return res.send({errMsg:'原密码错误'})
    }
  })

}


module.exports.viewUsermsg=function(req,res){
  var id=req.params.id
  console.log(id)
  Msg.findOne({affair:id},(err,doc)=>{
    res.json(doc)
  })
}

module.exports.viewallUser=function(req,res){
  Msg.find((err,doc)=>{
    res.json(doc)
  })
}

module.exports.editMsg=function(req,res){
  var userid=req.params.id
  console.log(req.params)
  Msg.findOne({userid:userid},(err,doc)=>{
    res.json(doc)
  })
}

module.exports.sendMsg=function(req,res){
  var userid=req.params.id
  console.log(req.body)
  Msg.findOneAndUpdate({userid:userid},{$set:{msg:req.body.msg}},(err,doc)=>{
    res.json(doc)
  })
}
module.exports.updateElectric=function(req,res){
  let electric = res.body.addElectric
      userid = res.session.userid
  Msg.findOneAndUpdate({userid:userid},{electric:electric},(err,doc)=>{
    console.log(doc)
    res.redirect('/ok')
  })
}