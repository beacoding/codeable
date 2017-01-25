const express = require('express');
const router = express.Router();
const Promise = require("bluebird");


router.get('/', function(req, res, next) {
  res.render('index', { title: 'YouLearn' });
});

router.get('/video', function(req, res, next) {
  res.render('index', { title: 'YouLearn' });
});

router.get('/video/:video', function(req, res, next) {
  res.render('index', { title: 'YouLearn' });
});


module.exports = router;
