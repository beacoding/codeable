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
        <div className="homepage-container">
          <div className="homepage-landing">
            <div className="overlay">
              <div className="row">
                <div className="col-md-12 logo-container">
                  <a href="/" className="title"> CODEABLE </a>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-md-offset-4 description-container">
                  <span>Ready to conquer the programming world?</span><br/>
                  <span>Join Codeable, your one stop shop for learning how to program</span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-md-offset-4 homepage-form">
                  <NewVideoForm handleNewVideoSubmit ={this.handleNewVideoSubmit.bind(this)}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="video-table-container">
          <div className="container">
            <VideoTable videos={this.state.videoList}/>
          </div>
        </div>
      </div>
    );
  }

  //handlers
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
