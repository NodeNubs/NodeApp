'use strict';
var users = require('../../data/db');

var PATH_PREFIX = '../views';

module.exports = {
  get: function(req, res, next) {
    res.render('index', {authService: req.authService});
  },
  getAbout: function(req, res, next){ // TODO find a better place
    res.render('about', {authService: req.authService});
  }
};
