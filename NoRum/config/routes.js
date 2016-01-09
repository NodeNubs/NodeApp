'use strict';
var auth = require('./auth'),
  controllers = require('../app/controllers');

module.exports = function(app) {

  app.post('/login', auth.login);
  app.post('/logout', auth.logout);

  app.get('/api/*', function(req, res) {
    res.status(404);
    res.end();
  });

  app.get('*', function(req, res) {
    res.render('index', {currentUser: req.user});
  });
};
