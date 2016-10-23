var Sequelize = require('sequelize');

var db = new Sequelize('youlearnDB', 'root', '', {
  host: 'localhost',
  dialect: 'sqlite', 
  storage: './db/youlearnDB.sqlite'
});

db
  .authenticate()
  .then(function(err) {
    console.log('Connected to sqlite database');
  })
  .catch(function(err) {
    console.log('cannot connect to database');
  });

module.exports = db;
