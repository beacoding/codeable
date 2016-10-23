const React = require('react');
const VideoRow = require('./VideoRow.jsx');


var VideoTable = ({videos, handleVideoClick}) => {
	let allVideoRows = [];

	for (var i = 0; i < videos.length; i += 3) {
		let row;

		if (videos[i + 2]) {
			row = [videos[i], videos[i + 1], videos[i + 2]];
		} else if (videos[i + 1]) {
			row = [videos[i], videos[i + 1]];
		} else {
			row = [videos[i]];
		}
		allVideoRows.push(row);
	}


	return (
		<div className="row">
			<div className="col-md-12 photoTable">
			{
				allVideoRows.map(row => <VideoRow key={row[0].id} handleVideoClick={handleVideoClick} row={row}/>)
			}
			</div>
		</div>
	);
}

// VideoTable.propTypes = {
//   videos: React.Proptypes.array.isRequired
// }



module.exports = VideoTable;