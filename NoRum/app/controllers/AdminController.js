'use strict';
var users = require('../../data/users');

var PATH_PREFIX = 'admins';

module.exports = {
  getAdministration: function (req, res, next) {
    users.getAll(function (err, users) {
      if (err) {
        throw err;
      }
      res.render(PATH_PREFIX + '/administration', {authService: req.authService, data: users});
    });
  },
  postDeleteUser: function (req, res, next) {
    var userName = req.body.username;
    users.delete(userName, function (err, result) {
      if (err) {
        console.log(err);
        req.session.error = 'err';
      }
      else{
        req.session.success = 'User deleted';
        res.redirect('/administration');
      }
    });
  }
};
