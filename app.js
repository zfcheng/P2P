var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var fs = require('fs');
var through = require('through2');
require('./db');
var routes = require('./routes/routers');
var adminRouter = require('./routes/adminRouter');
var browserify = require('browserify');
var app = express();













// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/admin', adminRouter);
app.use(function(req, res, next) {
   if (req.url === '/global.js') {
    console.log(__dirname + '/browserify/db.js')
        res.setHeader('content-type', 'application/javascript');
        var b = browserify(__dirname + '/browserify/global.js').bundle();
        b.on('error', console.error);
        b.pipe(res);
    }
    // var aa = browserify(__dirname + "/browserify/cc.js")
    // .transform("babelify", {presets: ["es2015", "react"]})
    // .bundle()
    // .pipe(fs.createWriteStream("bundle.js"));
    // console.log(aa)
    // next();
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// var browserify = require('browserify');
// var transform = require('promise-stream');
// console.log('---')
// app.use(function *(next) {
//     console.log('====');
//       if (this.path.startsWith('/browserify')) {
//               var bundle = browserify(path.join(__dirname, 'public', this.path)).bundle();
//               // consolo.log(bundel);    
//               bundle = yield transform(bundle);
//                       this.type = "application/javascript";
//                           this.body = bundle.toString();
//                               return null;
//                                 }
//         yield next;
// });

// var browserify = require('browserify');
// var b = browserify(); 
// b.add('browserify/global.js');
// b.add('browserify/db.js');
// b.bundle();
// b.bundle().pipe();



/// error handlers

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


module.exports = app;
