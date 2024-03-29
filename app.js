var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon')
var router = require('./routes');
var methodOverride=require('method-override')
var session=require('express-session')
var flash=require('connect-flash')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname,'public','/images/favico.ico')))
app.use(flash())
app.use(methodOverride('__method'))

app.use(session({
  secret:'secretkey',
  resave:true,
  saveUninitialized:true,
  cookie:{maxAge:1000*60*60*24*7},
}))

app.use(router)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000)
console.log('serivce start')
module.exports = app;
