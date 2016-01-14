'use strict';
var encryption = require('../../utils/encryption'),
  users = require('../../data/users');

var PATH_PREFIX = 'users';

function ValidateUser(user) {
  var errors = [];

  function isEmailValid(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  if (user.password.length < 5 || user.password.length > 50) {
    errors.add("Password must be between 5 and 50 symbols!");
  }

  if (user.password !== user.confirmPassword) {
    errors.add("Passwords do not match!");
  }

  if (user.username.isNullOrUndefined) {
    errors.add("Username cannot be null or empty!");
  }

  if (user.username.length < 5 || user.username.length > 30) {
    errors.add("Username must be between 5 and 30 symbols!");
  }

  var usernameRegex = /[^A-Za-z0-9._]/;
  if (usernameRegex.test(user.username)) {
    errors.add("Username can contain only latin letters, digits, dot and underscore!")
  }

  if (!isEmailValid(user.email)) {
    errors.add("Invalid Email address!")
  }

  return errors;
}

module.exports = {
  getRegister: function (req, res, next) {
    res.render(PATH_PREFIX + '/register-view', {authService: req.authService})
  },
  postRegister: function (req, res, next) {
    var newUserData = req.body.user;

    var usernameErrors = ValidateUser(newUserData);

    //if (newUserData.password != newUserData.confirmPassword) {
    //  req.session.error = "Passwords did not match :P";
    //  res.redirect('/register');
    //}
    //else
    if (usernameErrors.length > 0) {
      for (var err in usernameErrors) {
        req.session.error = req.session.error + " " + err;
      }

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
  putUpdate: function (req, res, next) {
    var updateUserData = req.body;

    var usernameErrors = ValidateUser(updateUserData);
    if (usernameErrors.length > 0) {
      for (var err in usernameErrors) {
        req.session.error = req.session.error + " " + err;
      }

      return;
      // TODO: what should happen when the update user is invalid?! reload, redirect ?
    }

    users.update(req.authService.user.username, updateUserData, function (err, result) {
      if (err) {
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
