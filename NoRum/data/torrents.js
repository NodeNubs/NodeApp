'use strict'
var Torrent = require('mongoose').model('Torrent');

module.exports = {
  create: function(torrent, callback) {
    Torrent.create(torrent, callback);
  }
};