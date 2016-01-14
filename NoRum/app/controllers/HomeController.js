'use strict';
var users = require('../../data/users');

var PATH_PREFIX = '../views';

module.exports = {
  get: function(req, res, next) {
    users.getUserCount(function(err, count){
      if(err){
        console.log(err)
      } else {
        res.render('index', {authService: req.authService, data: count});
      }
    })
  },
  getAbout: function(req, res, next){ // TODO find a better place
    res.render('about', {authService: req.authService});
  }
};
