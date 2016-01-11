'use strict';
var User = require('mongoose').model('User');

module.exports = {
  create: function(user, callback) {
    User.create(user, callback);
  },
  update: function (name, callback) {
    User.findOne({ username: name }, callback);
  },
  getByNames: function (redPlayer, blackPlayer, callback) {
    User.find({
      $and: [{ $or: [{ username: redPlayer }, { username: blackPlayer }] }]
    }, callback);
  },
  getAll: function (callback) {
    User.find(callback);
  }
};
