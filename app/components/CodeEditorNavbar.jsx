const React = require('react');

const CodeEditorNavbar = ({handleCodeRun, handleToggleConsole}) => {
	return (
      <div className="code-editor-nav-bar">
        {handleCodeRun ? <span className="ion-ios-play-outline" onClick={handleCodeRun.bind(this)}></span> : null}
        <span className="ion-ios-monitor-outline" onClick={handleToggleConsole.bind(this)}></span>
      </div>
		)
}

module.exports = CodeEditorNavbar;