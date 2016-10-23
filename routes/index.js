var express = require('express');
var router = express.Router();
var utils = require('../utils/videoHelpers.js');
var Video = require('../models/Videos.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'YouLearn' });
});

router.post('/submitVideo', function(req, res, next) {
	console.log(req.body);
	if (utils.isValidUrl(req.body.videoUrl)) {
		Video.create({
			videoUrl: req.body.videoUrl
		})
		.then(function() {
			console.log('successfully sent to database');
			res.send(201);
		});
	} else {
		console.log('nay');
		res.send('not a valid url');
	}
});

module.exports = router;
