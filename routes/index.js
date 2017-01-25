const express = require('express');
const router = express.Router();
const utils = require('../lib/utils/videoHelpers.js');
const Video = require('../models/Videos.js');
const Promise = require("bluebird");


router.get('/', function(req, res, next) {
  res.render('index', { title: 'YouLearn' });
});

module.exports = router;
