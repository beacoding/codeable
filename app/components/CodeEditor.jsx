const React = require('react');
const CodeEditorNavBar = require('./CodeEditorNavBar.jsx');

class CodeEditor extends React.Component {
	constructor(props) {
		super(props);

    this.state = {
      codeValue: null,
      toggle: false
    }
	}

  componentWillMount() {
    if (window.localStorage.hasOwnProperty(window.location)) {
      const code = window.localStorage[window.location];

      this.setState({
        codeValue: code
      });
    }
  }


  componentDidMount() {
    var context = this;
    var codeEditor = document.getElementById("code-editor")
    var editor = CodeMirror.fromTextArea(codeEditor, {
      lineNumbers: true,
      theme: 'solarized dark',
      styleActiveLine: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      indent: true,
      mode: 'python'
    });

    editor.on('changes', function(editor, e){
      var code = editor.getValue();
      var textArea = document.getElementById("code-editor");
      textArea.value = code;
      context.saveCode();
    });
  }

  // handleCodeChange(e) {
  //   const code = document.getElementById("code-editor");
  //   this.saveCode();
  // }

  handleDisplayOutput(text) {
    const mypre = document.getElementById("output"); 
    mypre.innerHTML = mypre.innerHTML + text;
  }

  builtinRead(x) {
      if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
              throw "File not found: '" + x + "'";
      return Sk.builtinFiles["files"][x];
  }

  handleCodeRun() {
    const prog = document.getElementById("code-editor").value;
    //for each import
      //check filename
      //if filename is equal to one of the tabs' names
        //get value of tabs
        //replace the import blurb with the value of tabs

    const mypre = document.getElementById("output");
    mypre.innerHTML = ''; 
    Sk.pre = "output";
    Sk.configure({output: this.handleDisplayOutput.bind(this), read:this.builtinRead.bind(this)}); 
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
    Sk.canvas = 'mycanvas';
    const myPromise = Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, prog, true);
    });

    myPromise.then(function(mod) {
        console.log('success');
    },
        function(err) {
        console.log(err.toString());
    });
  }

  saveCode() {
    const code = document.getElementById("code-editor").value;
    this.setState({
      codeValue: code
    });
    window.localStorage.setItem(window.location, code);
  }



	render() {
	  return (
	    <div>
        <div className="code-editor-nav-bar">
          <CodeEditorNavBar handleCodeRun={this.handleCodeRun.bind(this)} handleToggleConsole={this.props.handleToggleConsole}/>
        </div>
	    	<form> 
	    	<textarea id="code-editor">
	    	  {this.state.codeValue}
	    	</textarea><br/>
	    	</form>
		  </div>
    )
	}
}

module.exports = CodeEditor;