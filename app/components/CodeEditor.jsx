const React = require('react');

class CodeEditor extends React.Component {
	constructor(props) {
		super(props);

    this.state = {
      codeValue: null
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

  handleCodeChange(e) {
    const code = document.getElementById("yourcodebea");
    this.saveCode();
  }

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
    const prog = document.getElementById("yourcodebea").value;
    const mypre = document.getElementById("output"); 
    mypre.innerHTML = ''; 
    Sk.pre = "output";
    Sk.configure({output: this.handleDisplayOutput.bind(this), read:this.builtinRead.bind(this)}); 
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
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
    const code = document.getElementById("yourcodebea").value;
    this.setState({
      codeValue: code
    });
    window.localStorage.setItem(window.location, code);
  }

	render() {
	  return (
	    <div className="col-md-6">
	    	<form> 
	    	<textarea id="yourcodebea" onChange={this.handleCodeChange.bind(this)} cols="40" rows="10" >
	    	{this.state.codeValue}
	    	</textarea><br /> 
	    	<button type="button" onClick={this.handleCodeRun.bind(this)}>Run</button> 
	    	</form>

	    	<div>
	    		<div id="output"></div>
	    		<div id="mycanvas"></div>
	    	</div>
		  </div>
    )
	}
}

module.exports = CodeEditor;

/*
<iframe className="embed-responsive-item" src="https://trinket.io/embed/python/5375445fcc" allowfullscreen></iframe>
<iframe src="https://trinket.io/embed/python/5375445fcc?toggleCode=true" allowfullscreen></iframe
*/

/*
    <div className="embed-responsive embed-responsive-4by3">
      <iframe className="embed-responsive-item" src="https://trinket.io/embed/python/5375445fcc" allowFullScreen></iframe>
    </div>
*/