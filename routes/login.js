var express = require('express');
var login = express.Router();

login.get('/', function(req, res, next) {
res.render('login',{ title:'登陆页面'});

});

module.exports = login;