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


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoList: [],
      searchVideoList: []
    };
  }

  componentDidMount() {
    this.getAllVideos = $.get('/videos/mostPopularVideos', function(data) {
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
                    Want to write python code alongside YouTube Videos?<br/>
                    Use Codeable!
                </div>
                <div className="new-video-container">
                    <NewVideoForm handleNewVideoSubmit ={this.handleNewVideoSubmit.bind(this)}/>
                    <SearchBox handleSearchChange={this.handleSearchChange.bind(this)}/>
                </div>
              </div>
            </div>
          </div>
          <div className="video-search-results-container">
            <VideoSearchResults videos = {this.state.searchVideoList} handleSearchVideoClick={this.handleSearchVideoClick.bind(this)}/> 
          </div>
          <div className="video-table-container">
            <div className="container">
              <div className="header"> Most Recent Videos </div> 
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
          $.post('/videos/submitVideo', {videoId: videoId, videoUrl: input}, function() {
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

    handleSearchVideoClick(video) {
      const context = this;
      const videoObj = {
        videoId: video.id.videoId,
        videoTitle: video.snippet.title,
        videoUrl: utils.getVideoUrlById(video.id.videoId),
        videoDescription: video.snippet.description,
        videoImage: video.snippet.thumbnails.medium.url
      }
      $.post('/videos/addSearchedVideo', videoObj, function(data) {
        console.log(context.state.videoList, data[0]);
        const videoList = context.state.videoList;
        videoList.push(data[0]);
        context.setState({
          videoList: videoList
        });
        console.log(context.state.videoList);
      })
    }
  }



  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={App}></Route>
      <Route path="/video/:videoId" component={VideoPage}></Route>
  </Router>
), document.getElementById('app'))
