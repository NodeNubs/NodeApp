'use strict';
var mongoose = require('mongoose'),
  encryption = require('../../utils/encryption');

module.exports.init = function() {
  var userSchema = mongoose.Schema({
    username: { type: String, require: '{PATH} is required', unique: true },
    email: { type: String, require: '{PATH} is required', unique: true },
    about: { type: String, require: '{PATH} is required'},
    salt: String,
    password: String,
    roles: [String]
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

  mongoose.model('User', userSchema);
};
