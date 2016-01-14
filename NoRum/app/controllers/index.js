'use strict';
var UsersController = require('./UsersController');
var HomeController = require('./HomeController');
var TorrentController = require('./TorrentController');

var AdminController = require('./AdminController');

module.exports = {
  UserController: UsersController,
  HomeController: HomeController,
  TorrentController: TorrentController,
  AdminController: AdminController
};
