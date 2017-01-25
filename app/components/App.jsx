import { Router, Route, Link, browserHistory } from 'react-router'
const React = require('react');
const ReactDOM = require('react-dom');
const NewVideoForm = require('./NewVideoForm.jsx');
const VideoTable = require('./VideoTable.jsx');
const VideoPage = require('./VideoPage.jsx');
const SearchBox = require('./SearchBox.jsx');
const VideoSearchResults = require('./VideoSearchResults.jsx');
const utils = require('../../lib/utils/videoHelpers.js');
const bootstrap = require('bootstrap');
const API_KEY = require('../../lib/config/apiKeys');
const Slider = require('react-slick');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoList: [],
      searchVideoList: []
    };
  }

  componentDidMount() {
    this.getAllVideos = $.get('/video/getVideos', function(data) {
      const videos = utils.getAllVideoObjects(data);
      this.setState({
        videoList: videos,
      });
    }.bind(this));
  }

  render() {
    return (
      <div>
        <div className="homepage-container">
          <div className="homepage-landing">
            <div className="overlay">
              <div className="logo-container">
                <a href="/" className="title"> CODEABLE </a>
              </div>
              <div className="subtitle">
                    Ready to conquer the programming world?<br/>
                    Join Codeable, your one place to learn how to program
                </div>
                <div className="new-video-container">
                    <NewVideoForm handleNewVideoSubmit ={this.handleNewVideoSubmit.bind(this)}/>
                    <SearchBox handleSearchChange={this.handleSearchChange.bind(this)}/>
                </div>
              </div>
            </div>
          </div>
          <div className="video-search-results-container">
            <VideoSearchResults videos = {this.state.searchVideoList}/> 
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
          $.post('/video/submitVideo', {videoId: videoId, videoUrl: input}, function() {
            location.reload();
          });
        } else {
          console.log('Please enter a valid url');
        }
      }
    }

    handleSearchChange(e) {
      var context = this;
      const searchEntry = e.target.value;
      const searchUrl = 'https://www.googleapis.com/youtube/v3/search?';

      const data = {
        q: searchEntry,
        videoEmbeddable: true,
        maxResults: 12,
        key: API_KEY,
        part: 'snippet',
        type: 'video'
      }

      $.get(searchUrl, data, function(data) {
        context.setState({
          searchVideoList: data.items
        });
      });
    }

  }

  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={App}></Route>
    <Route path="/video/:videoId" component={VideoPage}></Route>
  </Router>
), document.getElementById('app'))
