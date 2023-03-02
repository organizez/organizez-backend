var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var citiesRouter = require('./routes/cities');
var providersRouter = require('./routes/providers');
var blogsRouter = require('./routes/blog');
var categoriesServicesRouter = require('./routes/categoriesServices');
var countiesRouter = require('./routes/counties');
var formsRouter = require('./routes/forms');
var servicesRouter = require('./routes/services');
var portofolioRouter = require('./routes/portofolio');
var aboutUsRouter = require('./routes/aboutUs');
var termsConditionsRouter = require('./routes/termsConditions');
var dataPrivacyPolicyRouter = require('./routes/dataPrivacyPolicy');
var anpcRouter = require('./routes/anpc');
var contactFormsRouter = require('./routes/contactForms');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cities', citiesRouter);
app.use('/providers', providersRouter);
app.use('/blog', blogsRouter);
app.use('/categoriesServices', categoriesServicesRouter);
app.use('/counties', countiesRouter);
app.use('/forms', formsRouter);
app.use('/services', servicesRouter);
app.use('/portofolio', portofolioRouter);
app.use('/aboutUs', aboutUsRouter);
app.use('/termsConditions', termsConditionsRouter);
app.use('/dataPrivacyPolicy', dataPrivacyPolicyRouter);
app.use('/anpc', anpcRouter);
app.use('/contactForms', contactFormsRouter);

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

module.exports = app;