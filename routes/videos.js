var express = require('express');
var router = express.Router();

/* GET videos listing. */

router.get('/:videoId', function(req, res, next) {
	res.render('video', {title: 'You Learn'});	
});

module.exports = router;
