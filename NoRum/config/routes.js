'use strict';
var auth = require('./auth'),
  controllers = require('../app/controllers');

module.exports = function(app) {

  app.get('/about', controllers.HomeController.getAbout);

  app.get('/login', controllers.UserController.getLogin);
  app.get('/register', controllers.UserController.getRegister);
  app.post('/register', controllers.UserController.postRegister);
  app.get('/manager', controllers.UserController.getManager);

  app.post('/login', auth.login);
  app.get('/logout', auth.logout);

  app.get('/addTorrent', controllers.TorrentController.getAddTorrent);
  app.get('/categories', controllers.TorrentController.getCategories);
  app.get('/managetorrents', controllers.TorrentController.getManageTorrents);
  app.get('/alltorrents', controllers.TorrentController.getAllTorrents);


  app.get('*', function(req, res) {
    res.render('index', {loggedUser: req.user});
  });
};
