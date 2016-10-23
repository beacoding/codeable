var React = require('react');
var ReactDOM = require('react-dom');
var NewVideoForm = require('./NewVideoForm.jsx');
var VideoTable = require('./VideoTable.jsx');
var $ = require('jQuery');

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videoList: null
    }
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
      $.ajax({
        url: '/submitVideo',
        dataType: 'json',
        type: 'POST',
        data: {videoUrl: e.target.value},
        success: function(data) {
          console.log('yay data sent!');
        }.bind(this),
        error: function(err) {
          console.error(err); 
        }
      })
    }
  }

  handleVideoClick(video) {

  }
}

ReactDOM.render(<App />, document.getElementById('app'));