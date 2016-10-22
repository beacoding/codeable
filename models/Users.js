var db = require('../db/config.js');
var Sequelize = require('sequelize');

var User = db.define('users', {
  name: Sequelize.STRING
});

module.exports = User;
