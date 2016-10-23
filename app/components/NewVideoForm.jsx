var React = require('react');

var NewVideoForm = ({handleNewVideoSubmit}) =>
	(
	<input className="form-control" type="text" placeholder="Enter a new video" onKeyPress={handleNewVideoSubmit.bind(this)} />
	)

module.exports = NewVideoForm;