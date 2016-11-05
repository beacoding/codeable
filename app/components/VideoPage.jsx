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
      currentVideo: null
    };
  }

  componentWillMount() {
    this.checkVideoIdInDB = 
    	$.ajax({
    		url: '/checkVideoIdInDB',
    		data: {videoId: this.props.params.videoId},
    		success: function(video) {
    			this.setState({
    				currentVideo: video
    			})
    		}.bind(this),
    		error: function(err) {
    			console.log('not in db', err);
    		}.bind(this)
    	});
  }

  render() {
  	if (this.state.currentVideo === null) {
  		return null;
  	} else {
	  	return (
	  		<div>
          <div className="navbar-container row">
            <div className="col-md-2 logo">
              <a href="/"> CODEABLE </a>
            </div>
          </div>
          <div className="video-page-container">
  	  			<div className="row video-player-container">
  	  				<div className="col-md-12 title">
  	  					{this.state.currentVideo.videoTitle}
    					</div>
  				  </div>
  	  			<div className="row">
              <div className="col-md-6">
  	  			      <VideoPlayer video={this.state.currentVideo} />
              </div>
              <div className="col-md-6">
                <CodeEditor />
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12">
                    <VideoDescription video ={this.state.currentVideo} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <QuestionSection video={this.state.currentVideo} />
                  </div>
                </div>
              </div>
              <div className="col-md-6 hidden">
                <CodeOutput />
              </div>
  	  			</div>
          </div>
			</div>
	  	)
  	}
  }

}

/*
              <div className="col-md-4 hidden">
                <Console />
              </div>
              */

module.exports = VideoPage;