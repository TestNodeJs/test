var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var login = require('./routes/login');
var partials = require('express-partials');
var session = require('express-session');
var sessionstore = require('sessionstore');
var flash = require('connect-flash');
var app = express();
var ejs = require('ejs');

var avosExpressCookieSession = require('avos-express-cookie-session');
app.use(express.cookieParser('Your Cookie Secure'));
app.use(avosExpressCookieSession({ cookie: { maxAge: 3600000 }, fetchUser: true}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.engine('.html', ejs.__express);
app.set('view engine', 'html');// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', login);
app.use('/users', users);
app.use('/login', login);

app.use(session({
        secret : 'fens.me',
        cookie: { maxAge: 900000 },                //session 的 保存时间，这里是半小时
    store: sessionstore.createSessionStore()
}));
app.use(flash());   
app.use(function(req, res, next){
var error = req.flash('error');
var success = req.flash('success');
res.locals.user = req.session.user;
res.locals.error = error.length ? error : null;
res.locals.success = success ? success : null;
next();
});
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next();
});
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('hello', {
            message: err.message,
            error: err
        });
    });
}
app.listen(3000);

module.exports = app;
