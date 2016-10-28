const React = require('react');
import { Router, Route, Link, browserHistory } from 'react-router'

const VideoEntry = ({video}) => {
	return (
		<div className="col-md-4">
			<Link to={`/video/${video.videoId}`} >
				<div className="video-entry-image">
				<img 
					src={video.videoImage}
				/>
				</div>
			</Link>
		</div>
	)
}

// VideoEntry.proptypes = {
//   video: React.Proptypes.string.isRequired
// };

module.exports = VideoEntry;