const News=require('../db/models/newslist')

module.exports.getNews = function(req,res){
  News.find((err,doc)=>{
      console.log('找到通知数据')
      return res.send(doc)
  })
}

module.exports.addNew=function(req,res){
  console.log(req.body.addNew)
  console.log(req.body.addTitle)
  News.create({news:req.body.addNew,title:req.body.addTitle,date:req.body.addDate},(err,doc)=>{
    console.log(doc)
    res.send({msg:"ok"})
  })
}

module.exports.indexViewnew=function(req,res){
  const id=req.params.id
  News.findOne({_id:id},(err,doc)=>{
    console.log(doc)
    res.render('newdetails',{body:doc.news,title:doc.title})
  })
}

module.exports.delectNew=function(req,res){
  const id =req.params.id
  News.findByIdAndDelete(id,(err,doc)=>{
    res.send(doc)
  })
}

module.exports.changeNew=function(req,res){
  const id =req.params.id
  News.findOne({_id:id},(err,doc)=>{
    res.send({
      _id:doc._id,
      addTitle:doc.title,
      addDate:doc.date,
      body:doc.news
    })
  })
}

module.exports.udNew=function(req,res){
  const id =req.params.id
  const udStr={
    news:req.body.addNew,
    title:req.body.addTitle,
    date:req.body.addDate
  }
  News.findByIdAndUpdate({_id:id},udStr,(err,doc)=>{
    res.send(doc)
  })
}