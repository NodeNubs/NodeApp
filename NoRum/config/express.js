'use strict';
var express = require('express');
//var glob = require('glob'); // unused
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var session = require('express-session');
var methodOverride = require('method-override');
var passport = require('passport');

module.exports = function (app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(session({secret: 'magic unicorns', resave: true, saveUninitialized: true}));
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  //User management system
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function (req, res, next) {
    if (req.session.error || req.session.success) {
      app.locals.successMessage = req.session.success;
      app.locals.errorMessage = req.session.error;
      req.session.error = undefined;
      req.session.success = undefined
    }
    else {
      app.locals.errorMessage = undefined;
      app.locals.successMessage = undefined
    }

    next();
  });
  /*  app.use(function (req, res, next) {
   var err = new Error('Not Found');
   err.status = 404;
   next(err);
   }); shows the user a "friendly msg on serv err" for now keep it comented (easier debugging...)*/

  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

};
