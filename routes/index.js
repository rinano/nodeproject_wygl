var express = require('express');
var router = express.Router();

var News=require('../api/AddNew')
var LoginAndReg=require('../api/LoginAndReg')
var userMsg=require('../api/userMsg')
var userAff=require('../api/AddAffair')
var adminDeal=require('../api/adminDeal')

//首页路由
router.get('/', function(req, res, next) {
  if (req.session.userid != null){
    res.render('index', { n:1,userid:req.session.userid ,name:req.session.name});
  } else if (req.session.adminid != null){
    res.render('index', { n:2, adminid:req.session.adminid });
  } else if(req.session.staffid != null) {
    res.render('index', { n:3,staffid:req.session.staffid ,name:req.session.name});
  } else {
    res.render('index',{n:0})
  }

});

router.get('/newsList',News.getNews)
router.get('/detailsMsg/:id',News.indexViewnew)


//用户路由
router.get('/login',function(req,res){
  res.render('login')
})
router.post('/login',LoginAndReg.login)

router.get('/user',function(req,res){
  if (req.session.userid == null){
    return res.render('login',{errMsg:'请登录'})
  } else {
    return res.render('user')
  }
})
router.get('/viewAff',userAff.getAff)
router.post('/viewAff',userAff.addAff)


router.get('/usermsg',function(req,res){
  if (req.session.userid == null){
    return res.render('login',{errMsg:'请登录'})
  } else {
    return res.render('usermsg')
  }
})
router.post('/viewMsg/ud',userMsg.updateMsg)
router.post('/viewMsg/md',userMsg.modifyPasswd)
router.get('/viewMsg',userMsg.getMsg)

router.get('/register',function(req,res){
  res.render('register')
})
router.post('/register',LoginAndReg.register)

router.get('/logout',LoginAndReg.logout)
router.get('/user/electric',(req,res)=>{
 res.render('electric')
})
router.put('/user/electric',userMsg.updateElectric)
router.get('/ok',(req,res)=>{
  res.render('ok')
})

router.get('/usertrades',(req,res)=>{
  res.render('usertrades')
})
router.get('/tingsdetails',(req,res)=>{
  console.log('123')
  res.render('tingsdetails')
})
//管理路由

router.get('/adminlogin',(req,res)=>{
  res.render('adminlogin')
})
router.post('/adminlogin',adminDeal.login)

router.get('/admin',(req,res)=>{
  if (req.session.adminid==null){
    return res.render('login',{errMsg:'你不是管理员'})
  } else {
    return res.render('admin')
  }
  
})

router.get('/viewallAff',adminDeal.getAff)
router.get('/affList/:id',adminDeal.getAffedit)
router.put('/affList/:id',adminDeal.udAff)
router.get('/delectAff/:id',adminDeal.delectAff)
router.get('/viewuserMsg/:id',userMsg.viewUsermsg)

router.get('/viewuser',(req,res)=>{
  if (req.session.adminid==null){
    return res.render('login',{errMsg:'你不是管理员'})
  } else {
    return res.render('viewuser')
  }
  
})

router.get('/viewallUser',userMsg.viewallUser)
router.get('/editMsg/:id',userMsg.editMsg)
router.put('/sendMsg/:id',userMsg.sendMsg)

router.get('/indexnews',(req,res)=>{
  if (req.session.adminid==null){
    return res.render('login',{errMsg:'你不是管理员'})
  } else {
    return res.render('indexnews')
  }
  
})
router.get('/viewNew',News.getNews)
router.post('/viewNew',News.addNew)
router.post('/indexnews',News.addNew)
router.get('/delectNew/:id',News.delectNew)
router.get('/changeNew/:id',News.changeNew)
router.put('/changeNew/:id',News.udNew)
//工作人员
router.get('/staff',function (req,res) {
  if (req.session.staffid != null){
    res.render('staff')
  }else{ 
    res.render('login',{errMsg:'你不是管理员'})
  }
})
router.put('/affList/staff/:id',adminDeal.udAff)

module.exports = router;
