'use strict';
var users = require('../../data/users');
var PATH_PREFIX = 'admins';
var query;
module.exports = {
  getAdministration: function (req, res, next) {
    if (req.query.username === undefined || req.query.username.length === 0) {
      query = {};
    } else {
      query = req.query;
    }
    var page = req.query.page || 1;
    var pageSize = req.query.pageSize || 5;
    var orderBy = req.query.orderBy || 'asc';
    users.getAll(query, +page, +pageSize, orderBy, function (err, usersData) {
      if (err) {
        throw err;
      } else {
        for(var i = 0; i< usersData.users.length; i++){
          if(usersData.users[i].roles[0] === 'admin'){
            usersData.users[i].youCaintTouchThis = true;
          }
        }
        res.render(PATH_PREFIX + '/administration', {authService: req.authService, data: usersData});
      }

    });
  },
  postDeleteUser: function (req, res, next) {
    var userName = req.body.username;
    users.delete(userName, function (err, result) {
      if (err) {
        console.log(err);
        req.session.error = 'err';
      } else {
        req.session.success = 'User deleted';
      }
      res.send({redirect: '/'});
      res.end();
    });
  }
};
