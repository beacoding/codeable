const React = require('react');
const VideoEntry = require('./VideoEntry.jsx');

var VideoRow = ({row, handleVideoClick}) => (
	<div>
	{
		row.map(video => <VideoEntry key={video.id} handleVideoClick={handleVideoClick} video={video} />)
	}
	</div>
)

// VideoRow.propTypes = {
//   row: React.Proptypes.array.isRequired
// }

module.exports = VideoRow;