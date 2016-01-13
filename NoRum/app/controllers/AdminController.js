'use strict';
var users = require('../../data/users');

var PATH_PREFIX = 'admins';

module.exports = {
  getAdministration: function (req, res, next) {
    users.getAll(function (err, users) {
      if (err) {
        throw err;
      }
      res.render(PATH_PREFIX + '/administration', {data: users});
    });
  },
  postDeleteUser: function (req, res, next) {
    users.delete('Tea', function (err, res) {
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
