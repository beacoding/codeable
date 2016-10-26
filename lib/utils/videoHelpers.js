const querystring = require('querystring');
const API_KEY = require('../config/apiKeys');
const validUrlToMatch = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

exports.isValidUrl = function(url) {
  return url.match(validUrlToMatch);
};

exports.getVideoId = function(url) {
	return querystring.parse(url)['https://www.youtube.com/watch?v'];
}

exports.createIFrameSrc = function(videoId)  {
	return 'https://www.youtube.com/embed/'+ videoId;
}

exports.getAllVideoIds = function(data) {
	let ids = [];
	data.forEach(item => {
		ids.push(item.videoId);
	})
	return ids;
}

exports.getAllVideoObjects = function(data) {
	let videos = [];
	data.forEach(video => {
		videos.push(video);
	})
	return videos;
}