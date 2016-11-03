const React = require('react');
var ReactDOM = require ('react-dom');
const utils = require('../../lib/utils/videoHelpers.js');
const VideoPlayer = require('./VideoPlayer.jsx');
const CodeEditor = require('./CodeEditor.jsx');
const QuestionSection = require('./QuestionSection.jsx')

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
	  			<div className="row">
	  				<div className="col-md-12 video-player-title">
	  					{this.state.currentVideo.videoTitle}
  					</div>
				</div>
	  			<div className="row">
		  			<VideoPlayer video={this.state.currentVideo} />
		  			<CodeEditor />
	  			</div>
	  			<div className="row">
	  				<QuestionSection video={this.state.currentVideo} />
				</div>
			</div>
	  	)
  	}
  }

}

module.exports = VideoPage;