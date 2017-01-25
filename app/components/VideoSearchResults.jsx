const React = require('react');

const VideoSearchResults = ({videos}) => {
	if (!videos.length) {
		return <div></div>
	}

	return(
    <div>
      {videos.map((video,i) => {
        return (
            <div className="video-search-results" key={video.id.videoId}>
              <img src={video.snippet.thumbnails.medium.url}/>
            </div>
          )
      })}
    </div>
		)
}

module.exports = VideoSearchResults;