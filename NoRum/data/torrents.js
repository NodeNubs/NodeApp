'use strict'
var Torrent = require('mongoose').model('Torrent');

module.exports = {
  create: function(torrent, callback) {
    Torrent.create(torrent, callback);
  },
  find: function() {
    Torrent.find.apply(Torrent, arguments);
  },
  findOne: function() {
    Torrent.findOne.apply(Torrent, arguments);
  },
  getTorrentCount: function (callback) {
    Torrent.count(callback);
  },
  count: function() {
    Torrent.count.apply(Torrent, arguments);
  },
};
