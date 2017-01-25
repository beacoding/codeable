const React = require('react');

class QuestionSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: ''
    }
  }

  componentWillMount() {
  }

  handleQuestionSubmit(e) {
    if (e.key === 'Enter') {
      console.log('Submitted a question', e.target.value)
    } else {
      const youtubeVideo = document.getElementById("youtube-video");
      const time = youtubeVideo.getCurrentTime();
      console.log(time);
      this.setState({
        time: time
      })
    }
  }

  render() {
    return (
      <div className="question-section-container">
        <h4>Questions</h4>
        <div className="row">
          <div className="col-md-8">
            <input 
              className="form-control" 
              type="text" 
              placeholder="Ask a new question here!"
              onKeyPress={this.handleQuestionSubmit.bind(this)}>
            </input>
          </div>
          <div className="col-md-4">
            <input className="form-control" type="text"placeholder="Time"></input>
          </div>
        </div>
      </div>
      )
  }
}

module.exports = QuestionSection;