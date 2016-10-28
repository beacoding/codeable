const React = require('react');

const CodeEditor = () => {
  return (
    <div className="col-md-6">
      <div className="embed-responsive embed-responsive-4by3">
        <iframe className="embed-responsive-item" src="https://trinket.io/embed/python/5375445fcc" allowFullScreen></iframe>
      </div>
		</div>
    )
}


module.exports = CodeEditor;

/*
<iframe className="embed-responsive-item" src="https://trinket.io/embed/python/5375445fcc" allowfullscreen></iframe>
<iframe src="https://trinket.io/embed/python/5375445fcc?toggleCode=true" allowfullscreen></iframe
*/
