'use strict';
var passport = require('passport');

module.exports = {
  login: function(req, res, next) {
    var auth = passport.authenticate('local', function(err, user) {
      if (err) {
        return next(err);
      }

      if (!user) {
        req.session.error = 'User name or password did not match';
        res.redirect('/login');
      }

      req.logIn(user, function(err) {
        if (err){
          return next(err);
        }
        res.redirect('/');
      })
    });

    auth(req, res, next);
  },
  logout: function(req, res, next) {
    req.logout();
    res.redirect('/');
  },
  isAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      res.redirect('/login');
    }
    else {
      next();
    }
  },
  isInRole: function(role) {
    return function(req, res, next) {
      if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
        next();
      }
      else {
        res.status(403);
        res.end();
      }
    }
  }
};
