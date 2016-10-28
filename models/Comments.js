var db = require('../db/config.js');
var Sequelize = require('sequelize');

var Comment = db.define('comments', {
  user_id: Sequelize.INTEGER,
  video_id: Sequelize.INTEGER,
  comment_body: Sequelize.STRING
});

module.exports = Comment;
