'use strict';
var User = require('mongoose').model('User');

module.exports = {
  create: function(user, callback) {
    User.create(user, callback);
  },
  update: function (name, updateInfo, callback) {
    User.findOneAndUpdate({username: name}, updateInfo, callback);
  },
  delete: function (name, callback) {
    User.remove({username: name}, callback);
  },
  getAll: function (callback) {
    User.find(callback);
  }
};
