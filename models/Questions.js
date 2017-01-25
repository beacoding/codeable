var db = require('../db/config.js');
var Sequelize = require('sequelize');

var Question = db.define('video', {
  question: Sequelize.TEXT,
  time: Sequelize.STRING
});

module.exports = Question;
