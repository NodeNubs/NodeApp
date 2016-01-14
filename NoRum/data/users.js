'use strict';
var User = require('mongoose').model('User');

module.exports = {
  create: function (user, callback) {
    User.create(user, callback);
  },
  update: function (name, updateInfo, callback) {
    User.findOneAndUpdate({username: name}, updateInfo, callback);
  },
  delete: function (name, callback) {
    User.remove({username: name}, callback);
  },
  getAll: function (name, page, pageSize, orderBy, callback) {
    var name = name || {};
    User.find(name)
      .sort({
        username: orderBy
      })
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .exec(function (err, foundUsers) {
        if (err) {
          callback(err);
          return;
        }

        User.count().exec(function (err, numberOfUsers) {
          var data = {
            users: foundUsers,
            currentPage: page,
            pageSize: pageSize,
            total: numberOfUsers
          };

          callback(err, data);
        });
      })
  },
  getUserCount: function (callback) {
    User.count(callback);
  }
};
