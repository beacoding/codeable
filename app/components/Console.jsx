const React = require('react');
const CodeEditorNavBar = require('./CodeEditorNavBar.jsx');

class Console extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (
			<div className="console-container">
				<div className="code-editor-nav-bar">
				  <CodeEditorNavBar handleToggleConsole={this.props.handleToggleConsole}/>
				</div>
				<iframe frameBorder="0" src="/brython-console.html"></iframe>
			</div>
		)
	}
}


module.exports = Console;