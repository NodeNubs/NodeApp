'use strict';
var encryption = require('../../utils/encryption'),
  users = require('../../data/users');

var PATH_PREFIX = 'users';

module.exports = {
  getRegister: function(req, res, next) {
    res.render(PATH_PREFIX  + '/register-view')
  },
  postRegister: function(req, res, next) {
    var newUserData = req.body.user;

    if (newUserData.password != newUserData.confirmPassword) {
      req.session.error = 'Passwords do not match!';
      res.redirect('/register');
    }
    else {
      newUserData.salt = encryption.generateSalt();
      newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
      users.create(newUserData, function(err, user) {
        if (err) {
          console.log('Failed to register new user: ' + err);
          return;
        }

        req.logIn(user, function(err) {
          if (err) {
            res.status(400);
            return res.send({reason: err.toString()}); // TODO
          }
          else {
            res.redirect('/');
          }
        })
      });
    }
  },
  getLogin: function(req, res, next) {
    res.render(PATH_PREFIX  + '/login-view');
  },
  getManager: function(req, res, next){
    res.render(PATH_PREFIX + '/management-view', {'name' : 'John'});
  }
};
