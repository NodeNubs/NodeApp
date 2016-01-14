'use strict';
var torrents = require('../../data/torrents');
var fs = require('fs');
var formidable = require('formidable');
var PATH_PREFIX = 'torrents';
var PAGE_SIZE = 3;

module.exports = {
  getAddTorrent: function(req, res, next) {
    res.render(PATH_PREFIX + '/add-torrent', {
      authService: req.authService
    });
  },
  getCategories: function(req, res, next) {
    res.render(PATH_PREFIX + '/categories', {
      authService: req.authService
    });
  },
  getAllTorrents: function(req, res, next) {
    torrents.find({}, 'name description dateAdded size category', {
      skip: ((req.query.page || 1) - 1) * PAGE_SIZE,
      limit: PAGE_SIZE,
      sort: {
        dateAdded: -1,
      },
    }, function(err, result) {
      torrents.count({}, function(err, count) {
        res.render(PATH_PREFIX + '/all-torrents', {
          authService: req.authService,
          torrents: result,
          pages: Math.floor(count / PAGE_SIZE) + ((count % PAGE_SIZE) ? 1 : 0),
        });
      });
    });
  },
  getManageTorrents: function(req, res, next) {
    res.render(PATH_PREFIX + '/manage-torrents', {
      authService: req.authService
    });
  },
  postTorrent: function(req, res, next) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      var newTorrent = fields;
      newTorrent.dateAdded = new Date('YYYY/MM/DD');
      newTorrent.size = files.file.size;
      fs.readFile(files.file.path, function(err, data) {
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
  },
  downloadTorrent: function(req, res, next) {
    torrents.findOne({
      name: req.query.name,
    }, 'file name', function(err, torrent) {
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', 'filename=' + torrent.name + '.torrent');
      res.send(torrent.file.toString('ascii'));
    })
  }
};
