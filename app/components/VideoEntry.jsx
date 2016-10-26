const React = require('react');
import { Router, Route, Link, browserHistory } from 'react-router'

const VideoEntry = ({video}) => {
	return (
		<div className="col-md-4">
			<Link to={`/video/${video.videoId}`}>
				<img 
					className="video-entry-responsive img-responsive"
					src={video.videoImage}
				/>
			</Link>
		</div>
	)
}

// VideoEntry.proptypes = {
//   video: React.Proptypes.string.isRequired
// };

module.exports = VideoEntry;