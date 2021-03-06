'use strict';
var auth = require('./auth'),
  controllers = require('../app/controllers');

module.exports = function(app) {

  app.get('/about', controllers.HomeController.getAbout);

  app.get('/login', controllers.UserController.getLogin);
  app.get('/register', controllers.UserController.getRegister);
  app.post('/register', controllers.UserController.postRegister);
  app.get('/manager', auth.isAuthenticated, controllers.UserController.getManager);
  app.post('/manager', auth.isAuthenticated, controllers.UserController.putUpdate);

  app.get('/administration', auth.isInRole('admin'), controllers.AdminController.getAdministration);
  app.post('/deleteUser', auth.isInRole('admin'), controllers.AdminController.postDeleteUser);

  app.post('/login', auth.login);
  app.get('/logout', auth.logout);
  

  app.get('/addTorrent',auth.isAuthenticated, controllers.TorrentController.getAddTorrent);
  app.post('/addTorrent', auth.isAuthenticated, controllers.TorrentController.postTorrent);
  app.get('/managetorrents', auth.isAuthenticated, controllers.TorrentController.getManageTorrents);
  app.get('/downloadTorrent', auth.isAuthenticated, controllers.TorrentController.downloadTorrent);

  app.get('/categories', controllers.TorrentController.getCategories);
  app.get('/alltorrents', controllers.TorrentController.getAllTorrents);


  app.get('/', controllers.HomeController.get);
};
