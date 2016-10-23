const React = require('react');
const ReactDOM = require('react-dom');
const Router = require('react-router');
const NewVideoForm = require('./NewVideoForm.jsx');
const VideoTable = require('./VideoTable.jsx');
const utils = require('../../lib/utils/videoHelpers.js');
const bootstrap = require('bootstrap');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoList: []
    };
  }

  componentDidMount() {
    this.getAllVideos = $.get('/getVideos', function(data) {
      var videos = utils.getAllVideoObjects(data);
      this.setState({
        videoList: videos
      });
    }.bind(this));
  }

  render() {
    return (
      <div>
        <NewVideoForm handleNewVideoSubmit ={this.handleNewVideoSubmit.bind(this)}/>
        <VideoTable handleVideoClick={this.handleVideoClick.bind(this)} videos={this.state.videoList}/>
      </div>
    );
  }

  handleNewVideoSubmit(e) {
    if (e.key === 'Enter') {
      let input = e.target.value;

      let iFrameSrc = utils.createIFrameSrc(utils.getVideoId(input));
      let videoId = utils.getVideoId(input);

      if (utils.isValidUrl(input)) {
        $.post('/submitVideo', {videoId: videoId, videoUrl: input});
      } else {
        console.log('Please enter a valid url');
      }
    }
  }

  handleVideoClick(video) {
    window.location = '/video/' + video.videoId;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));