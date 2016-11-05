const React = require('react');

class Console extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (
			<div className="console-container">
        <iframe frameBorder="0" src="/brython-console.html"></iframe>
			</div>
		)
	}
}


module.exports = Console;