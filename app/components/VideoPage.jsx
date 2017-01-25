const React = require('react');
var ReactDOM = require ('react-dom');
const utils = require('../../lib/utils/videoHelpers.js');
const VideoPlayer = require('./VideoPlayer.jsx');
const CodeEditor = require('./CodeEditor.jsx');
const CodeOutput = require('./CodeOutput.jsx');
const Console = require('./Console.jsx');
const QuestionSection = require('./QuestionSection.jsx');
const VideoDescription = require('./VideoDescription.jsx');

class VideoPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentVideo: null,
      toggle: false
    };
  }

  componentWillMount() {
    this.checkVideoIdInDB = 
    	$.ajax({
    		url: '/videos/checkVideoIdInDB',
    		data: {videoId: this.props.params.videoId},
    		success: function(video) {
    			this.setState({
    				currentVideo: video
    			});
    		}.bind(this),
    		error: function(err) {
    			console.log('not in db', err);
    		}.bind(this)
    	});
  }

  handleToggleConsole() {
   this.setState({toggle: !this.state.toggle}); 
  }

  render() {
  	if (this.state.currentVideo === null) {
  		return null;
  	} else {
      const currentEditor = this.state.toggle ? <Console handleToggleConsole={this.handleToggleConsole.bind(this)}/> : <CodeEditor handleToggleConsole={this.handleToggleConsole.bind(this)}/>

	  	return (
	  		<div>
          <div className="navbar-container row">
            <div className="col-md-2 logo">
              <a href="/"> CODEABLE </a>
            </div>
          </div>
          <div className="video-page-container">
  	  				<div className="title">
  	  					{this.state.currentVideo.videoTitle}
    					</div>
              <div className="video-player-code-editor-container row">
                <div className="video-player-container col-md-6">
  			          <VideoPlayer video={this.state.currentVideo} />
                </div>
                <div className="code-editor-container col-md-6">
                  {currentEditor}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <VideoDescription video ={this.state.currentVideo} />
                  <QuestionSection video={this.state.currentVideo} />
                </div>
                <div className="col-md-6">
                  <CodeOutput />
                </div>
              </div>
          </div>
			</div>
	  	)
  	}
  }
}

module.exports = VideoPage;