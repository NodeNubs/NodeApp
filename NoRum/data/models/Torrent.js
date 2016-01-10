'use strict';
var mongoose = require('mongoose');

module.exports.init = function() {
  var torrentSchema = mongoose.Schema({
    name: String,
    file: Buffer,
    size: Number,
    dateAdded: Date,
    description: String,
    category: {type: String, enum: ['movie', 'music', 'game', 'other']},
  });

  var Torrent = mongoose.model('Torrent', torrentSchema);
};