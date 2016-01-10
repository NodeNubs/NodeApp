'use strict';

var PATH_PREFIX = 'torrents';

module.exports = {
  getAddTorrent: function(req, res, next) {
    res.render(PATH_PREFIX  + '/add-torrent')
  },
};