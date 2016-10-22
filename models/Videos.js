var db = require('../db/config.js');

var Video = sequelize.define('video', {
  videoId: Sequelize.STRING,
});

module.exports = Video;
