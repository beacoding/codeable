const React = require('react');
const VideoEntry = require('./VideoEntry.jsx');


var VideoRow = ({row}) => (
	<div>
	{
		row.map(video => <VideoEntry key={video.id} video={video} />)
	}
	</div>
)

// VideoRow.propTypes = {
//   row: React.Proptypes.array.isRequired
// }

module.exports = VideoRow;