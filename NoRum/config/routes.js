'use strict';
var auth = require('./auth'),
  controllers = require('../app/controllers');

module.exports = function(app) {
  app.get('/', controllers.HomeController.get);

  app.get('/login', controllers.UserController.getLogin);
  app.get('/register', controllers.UserController.getRegister);
  app.post('/login', auth.login);
  app.post('/logout', auth.logout);

};
