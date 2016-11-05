const React = require('react');

const QuestionSection = ({video}) => {
  return (
    <div className="question-section-container">
      <h4>Questions</h4>
      <div className="row">
      	<div className="col-md-8">
      		<input className="form-control" type="text" placeholder="Ask a new question here!"></input>
      	</div>
      	<div className="col-md-4">
      		<input className="form-control" type="text"placeholder="Time"></input>
      	</div>
  		</div>
    </div>
    )
}

module.exports = QuestionSection;