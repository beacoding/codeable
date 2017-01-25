const express = require('express');
const router = express.Router();
const Video = require('../models/Videos.js');
const request = require('request');
const keys = require('../lib/keys.js');
const utils = require('../lib/utils/videoHelpers.js');

/* GET videos listing. */
router.get('/getVideos', function(req, res, next) {
	Video.findAll({
	})
	.then(function(data) {
		res.send(data);
	});
});

router.get('/checkVideoIdInDB', function(req, res, next) {
	Video.findOne({
		where: {videoId: req.query.videoId}
	})
	.then(function(video) {
		if (video) {
      const newCount = video.dataValues.videoClicks + 1;
      video.update({
        videoClicks: newCount
      })
      .then(function(response) {
        res.status(201).send(response);
      });
		} else {
			res.send(400, false);
		}
	})
	.catch(function(err) {
		console.error(err);
		res.send(404);
	});
});

router.post('/submitVideo', function(req, res, next) {
	const options = {
		method: 'GET',
		uri: 'https://www.googleapis.com/youtube/v3/videos',
		qs: {
			id: req.body.videoId,
			key: keys.youtubeKey,
			part: 'snippet',
			type: 'video'
		}
	}

	request(options,function(err, response, body) {
		if (err) {
			console.error(error)
		} else {
			const parsedBody = JSON.parse(body);
			const snippet = parsedBody.items[0].snippet;
			let videoImage = snippet.thumbnails.medium.url;

			Video.create({
				videoId: req.body.videoId,
				videoUrl: req.body.videoUrl,
				videoTitle: snippet.title,
				videoDescription: snippet.description,
				videoImage: videoImage
			})
			.then(function() {
				res.send(201);
			})
		}
	});
});


router.post('/addSearchedVideo', function(req, res, next) {
	const video = req.body;

	Video.findOrCreate({
		where: {
			videoId: video.videoId,
			videoId: video.videoId,
			videoUrl: video.videoUrl,
			videoTitle: video.videoTitle,
			videoDescription: video.videoDescription,
			videoImage: video.videoImage
		}
	})
	.then(function(data) {
		res.send(data);
	})
});

router.get('/mostPopularVideos', function(req, res) {
  Video.findAll({
    order: 'videoClicks DESC'
  })
  .then(function(results) {
    res.status(200).send(results);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).send(err);
  });
});


module.exports = router;
