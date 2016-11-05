const React = require('react');

const VideoPlayer = ({video}) => {
	return (
				<div className="embed-responsive embed-responsive-16by9">
					<iframe className="embed-responsive-item" src={'https://www.youtube.com/embed/' + video.videoId} allowFullScreen></iframe>
				</div>
	)
}

module.exports = VideoPlayer;