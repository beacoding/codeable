const React = require('react');

class VideoDescription extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			expanded: false,
			initialText: '',
			hiddenText: ''
		}
	}

	handleMoreHandler(e) {
		const expanded = !this.state.expanded;
		this.setState({
			expanded: expanded
		});
	}

	componentWillMount() {
		const text = this.props.video.videoDescription;
		const initialText = text.split('\n')[1];

		this.setState({
			initialText: initialText,
			hiddenText: text
		});
	}

	render() {
		const showMore = "Show More";
		const showLess = "Show Less";

		return (
			<div className="video-description-container">
				<div className="description-text">
					{this.state.expanded ? this.state.hiddenText: this.state.initialText}<br/>
					<a href="#" onClick={this.handleMoreHandler.bind(this)}>
						{	
							this.state.expanded ? showLess : showMore
						}
					</a>
				</div>
			</div>
		)
	}
}


 
module.exports = VideoDescription;