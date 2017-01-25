const React = require('react');
const VideoRow = require('./VideoRow.jsx');


const VideoTable = ({videos}) => {
	const allVideoRows = [];

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
			<div className="col-md-12 video-table">
			{
				allVideoRows.map(row => <VideoRow key={row[0].id} row={row}/>)
			}
			</div>
		</div>
	);
}


module.exports = VideoTable;