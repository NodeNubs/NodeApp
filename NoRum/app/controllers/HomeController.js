'use strict';
var users = require('../../data/db');

var PATH_PREFIX = '../views';

module.exports = {
  get: function(req, res, next) {
    res.render('home-view');
  }
};
