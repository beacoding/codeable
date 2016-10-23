var express = require('express');
var router = express.Router();
var utils = require('../lib/utils/videoHelpers.js');
var Video = require('../models/Videos.js');
var Promise = require("bluebird");
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'YouLearn' });
});

router.post('/submitVideo', function(req, res, next) {
	const options = {
		method: 'GET',
		uri: 'https://www.googleapis.com/youtube/v3/videos',
		qs: {
			id: req.body.videoId,
			key: 'AIzaSyBr7q2jy8PwKwwlIdNrOfDvl5ILgypgF7o',
			part: 'snippet',
			type: 'video'
		}
	}

	request(options,function(err, response, body) {
		if (err) {
			console.error(error)
		} else {
			let parsedBody = JSON.parse(body);
			let snippet = parsedBody.items[0].snippet;

			Video.create({
				videoId: req.body.videoId,
				videoUrl: req.body.videoUrl,
				videoTitle: snippet.title,
				videoDescription: snippet.description,
				videoImage: snippet.thumbnails.standard.url
			})
			.then(function() {
				console.log('successfully sent to the database');
				res.send(201);
			})
		}
	});
});

router.get('/getVideos', function(req, res, next) {
	Video.findAll({
	})
	.then(function(data) {
		res.send(data);
	});
});

module.exports = router;
