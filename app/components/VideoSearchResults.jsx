const React = require('react');
const Slider = require('react-slick');

const VideoSearchResults = ({videos, handleSearchVideoClick}) => {
	if (!videos.length) {
		return <div className="video-search-results"></div>
	}

	return(
    <Slider {...sliderSettings}>
      {videos.map((video,i) => {
        return (
            <div className="video-search-results" key={video.id.videoId}>
              <img 
                src={video.snippet.thumbnails.medium.url}
                onClick={handleSearchVideoClick.bind(null, video)}
              />
            </div>
          )
      })}
    </Slider>
		)
}

const sliderSettings = {
  slidesToShow: 4,
  slidesToScroll: 4
}

module.exports = VideoSearchResults;