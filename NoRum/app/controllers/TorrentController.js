'use strict';

var PATH_PREFIX = 'torrents';

module.exports = {
  getAddTorrent: function(req, res, next) {
    res.render(PATH_PREFIX  + '/add-torrent')
  },
  getCategories: function(req, res, next) {
    res.render(PATH_PREFIX  + '/categories')
  },
  getAllTorrents: function(req, res, next) {
    res.render(PATH_PREFIX  + '/all-torrents')
  },
  getManageTorrents: function(req, res, next) {
    res.render(PATH_PREFIX  + '/manage-torrents')
  }
};
