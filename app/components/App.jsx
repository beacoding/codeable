import { Router, Route, Link, browserHistory } from 'react-router'
const React = require('react');
const ReactDOM = require('react-dom');
const NewVideoForm = require('./NewVideoForm.jsx');
const VideoTable = require('./VideoTable.jsx');
const VideoPage = require('./VideoPage.jsx');
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
      const videos = utils.getAllVideoObjects(data);
      this.setState({
        videoList: videos
      });
    }.bind(this));
  }

  render() {
    return (
      <div>
        <NewVideoForm handleNewVideoSubmit ={this.handleNewVideoSubmit.bind(this)}/>
        <VideoTable videos={this.state.videoList}/>
      </div>
    );
  }



  handleNewVideoSubmit(e) {
    if (e.key === 'Enter') {
      const input = e.target.value;

      const iFrameSrc = utils.createIFrameSrc(utils.getVideoId(input));
      const videoId = utils.getVideoId(input);

      if (utils.isValidUrl(input)) {
        $.post('/submitVideo', {videoId: videoId, videoUrl: input}, function() {
          location.reload();
        });
      } else {
        console.log('Please enter a valid url');
      }
    }
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}></Route>
    <Route path="/video/:videoId" component={VideoPage}></Route>
  </Router>
), document.getElementById('app'))

// ReactDOM.render(<App />, document.getElementById('app'));