var express = require('express');
var login = express.Router();

login.get('/', function(req, res, next) {
res.render('login',{ title:'登陆页面'});

});

login.post('/login', function(req, res) {
 
//   res.send(req.body.username);
//    res.redirect('/main');
    AV.User.logIn(req.body.username, req.body.password).then(function() {
      //登录成功，avosExpressCookieSession会自动将登录用户信息存储到cookie
      //跳转到profile页面。
      console.log('signin successfully: %j', req.AV.user);
      res.send('signin successfully: %j', req.AV.user)
//      res.redirect('/profile');
    },function(error) {
      //登录失败，跳转到登录页面
      res.redirect('/login');
  });
});
//查看用户profile信息
login.get('/mainview', function(req, res) {
    // 判断用户是否已经登录
    if (req.AV.user) {
      // 如果已经登录，发送当前登录用户信息。
      res.send(req.AV.user);
    } else {
      // 没有登录，跳转到登录页面。
      res.redirect('/');
    }
});

//调用此url来登出帐号
login.get('/logout', function(req, res) {
  //avosExpressCookieSession将自动清除登录cookie信息
  console.log('logout');
    AV.User.logOut();
    res.redirect('/profile');
});

module.exports = login;