'use strict';
var users = require('../../data/users');
var torrents = require('../../data/torrents');

var PATH_PREFIX = '../views';

module.exports = {
  get: function(req, res, next) {
    var counts = {};

    users.getUserCount(function(err, count){
      if(err){
        console.log(err)
      } else {
        counts.users = count;
      }
      torrents.getTorrentCount(function (err, count) {
        if (err) {
          console.log(err)
        } else {
          counts.torrents = count;
        }

        res.render('index', {authService: req.authService, data: counts});
      });
    });


  },
  getAbout: function(req, res, next){ // TODO find a better place
    res.render('about', {authService: req.authService});
  }
};
