var React = require('react');

var NewVideoForm = ({handleNewVideoSubmit}) =>
	(
  	<div>
      <input 
        className="form-control" 
        type="text" 
        placeholder="Enter a new video" 
        onKeyPress={handleNewVideoSubmit.bind(this)} />
    </div>
	)

module.exports = NewVideoForm;