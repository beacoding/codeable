   const React = require('react');

var VideoEntry = ({video, handleVideoClick}) => {
	return (
			<img 
				className="video-entry-image-size" 
				src={video.videoImage}
				onClick={() => handleVideoClick(video)}
			/>
	)
}

// VideoEntry.proptypes = {
//   video: React.Proptypes.string.isRequired
// };

module.exports = VideoEntry;