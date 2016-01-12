'use strict';
var mongoose = require('mongoose'),
  encryption = require('../../utils/encryption');

module.exports.init = function() {
  var userSchema = mongoose.Schema({
    username: { type: String, require: '{PATH} is required', unique: true },
    salt: String,
    password: String,
    points: Number
  });

  userSchema.method({
    authenticate: function(password) {
      if (encryption.generateHashedPassword(this.salt, password) === this.password) {
        return true;
      }
      else {
        return false;
      }
    }
  });

  var User = mongoose.model('User', userSchema);
};
