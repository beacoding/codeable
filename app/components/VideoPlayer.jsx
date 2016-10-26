const React = require('react');

const VideoPlayer = ({video}) => {
	console.log('this is the video', video)
	return (
			<div className="col-md-6">
				<div className="embed-responsive embed-responsive-16by9">
					<iframe className="embed-responsive-item" src={'https://www.youtube.com/embed/' + video.videoId} allowFullScreen></iframe>
				</div>
			</div>
	)
}

module.exports = VideoPlayer;