var express = require('express');
var mainview = express.Router();

mainview.get('/', function(req, res, next) {
res.render('main',{ title:'页面'});

});