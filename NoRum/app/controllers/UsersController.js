'use strict';
var encryption = require('../../utils/encryption'),
  users = require('../../data/users');

var PATH_PREFIX = 'users';

module.exports = {
  getRegister: function (req, res, next) {
    res.render(PATH_PREFIX + '/register-view', {authService: req.authService})
  },
  postRegister: function (req, res, next) {
    var newUserData = req.body.user;

    if (newUserData.password != newUserData.confirmPassword) {
      req.session.error = "Passwords did not match :P";
      res.redirect('/register');
    }
    else {
      newUserData.salt = encryption.generateSalt();
      newUserData.password = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
      newUserData.about = 'Newbie';
      newUserData.roles = ['user'];
      users.create(newUserData, function (err, user) {
        if (err) {
          console.log('Failed to register new user: ' + err);
          req.session.error = 'User name is taken';
          res.redirect('/register');
          return;
        }

        req.logIn(user, function (err) {
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
  getLogin: function (req, res, next) {
    res.render(PATH_PREFIX + '/login-view', {authService: req.authService});
  },
  getManager: function (req, res, next) {
    res.render(PATH_PREFIX + '/management', {authService: req.authService});
  },
  putUpdate: function(req, res, next){
    var updateUserData = req.body;
    users.update(req.authService.user.username, updateUserData, function(err, result){
      if(err){
        console.log(err);
        req.session.error = err;
      }
      else {
        req.session.success = 'Profile updated';
        res.redirect('/manager');
      }
    })
  }
}
;
