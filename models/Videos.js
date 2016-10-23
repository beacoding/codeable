var db = require('../db/config.js');
var Sequelize = require('sequelize');

var Video = db.define('video', {
  videoId: Sequelize.STRING,
  videoUrl: Sequelize.STRING,
  videoTitle: Sequelize.STRING,
  videoDescription: Sequelize.STRING,
  videoImage: Sequelize.STRING,
});

module.exports = Video;
