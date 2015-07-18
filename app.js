var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var catalog = require('./routes/catalog');
var account = require('./routes/account');
var user = require('./routes/user');
var order = require('./routes/order');
var database = require('./models/database');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 设置cookie和session
// 使用：npm install express-session --save   安装session模块
// 参考：https://www.npmjs.com/package/express-session
app.use(session({
    secret: 'mall_front_session',
    resave: false,
    saveUninitialized: true,
    cookie: { 
      maxAge: 900000,
    }
}));

app.use('/api/catalog', catalog);
app.use('/api/account', account);
app.use('/api/user', user);
app.use('/api/order', order);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// 数据库开闭
database.open();
app.on('close', function(){
  database.close();
});

module.exports = app;
