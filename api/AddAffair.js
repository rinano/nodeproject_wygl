const Affair = require('../db/models/affair')
const UserTable = require('../db/models/user')

module.exports.getAff=function(req,res){
  var id=req.session.userid

  UserTable.findOne({userid:id},(err,doc)=>{
    console.log(doc.affair)
    Affair.find({_id:{$in:doc.affair}},(err,doc)=>{
      console.log(doc)
      return res.send(doc)
    })
  })

}

module.exports.addAff=function(req,res,next){
  const insertStr= {
    affair:req.body.affair,
    stat:'等待处理'
  }
  Affair.create(insertStr,(err,doc)=>{
    if(err){
      return res.send({errMsg:'创建失败'})
    }else{
      console.log(doc._id)
      UserTable.findOneAndUpdate({userid:req.session.userid},{$push:{affair:doc._id}},(err,doc)=>{
        console.log(doc)
      })
      return res.send({msg:'创建成功'})
    }
  })
}
