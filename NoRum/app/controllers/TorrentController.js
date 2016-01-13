'use strict';
var torrents = require('../../data/torrents');
var fs = require('fs');
var formidable = require('formidable');
var PATH_PREFIX = 'torrents';

module.exports = {
  getAddTorrent: function(req, res, next) {
    res.render(PATH_PREFIX + '/add-torrent', {authService: req.authService});
  },
  getCategories: function(req, res, next) {
    res.render(PATH_PREFIX + '/categories', {authService: req.authService});
  },
  getAllTorrents: function(req, res, next) {
    res.render(PATH_PREFIX + '/all-torrents', {authService: req.authService});
  },
  getManageTorrents: function(req, res, next) {
    res.render(PATH_PREFIX + '/manage-torrents', {authService: req.authService});
  },
  postTorrent: function(req, res, next) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      var newTorrent = fields;
      newTorrent.dateAdded = new Date();
      newTorrent.size = files.file.size;
      fs.readFile(files.file.path, 'base64', function(err, data) {
        if (err) {
          console.log(err);
          return;
        }

        newTorrent.file = data;
        torrents.create(newTorrent, function(err, torrent) {
          if (err) {
            console.log(err);
          }

          res.redirect('/');
        });
      });
    });
  }
};