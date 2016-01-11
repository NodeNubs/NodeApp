'use strict';
var User = require('mongoose').model('User');

module.exports = {
  create: function(user, callback) {
    User.create(user, callback);
  },
  update: function (name, callback) {
    User.findOne({ username: name }, callback);
  },
  getAll: function (callback) {
    User.find(callback);
  }
};
