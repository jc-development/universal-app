import React, {Component} from 'react';
import {Carousel} from 'react-responsive-carousel';



const SlideData = ( props ) => (
<div dangerouslySetInnerHTML={{ __html: `
  <div class="legend">
    <h1>${props.title}</h1>
    <p>${props.content}</p>
  </div>
  <video id=${props.id} class="video-slider"
    muted
    playsinline
    loop
    src="${props.src}"
    poster="${props.poster}"
  ></video>
` }}
/>
);

export default class StoreSlider extends Component {
  constructor(props) {
    super(props);

    this.timeout = null;

    this.onChange = this.onChange.bind(this);
    // this.onClickItem = this.onClickItem.bind(this);
    // this.onClickThumb = this.onClickThumb.bind(this);
  }

  onChange() {
    window.ga('send', 'event', 'Page Interaction');
    // get all sliders and pause videos if playback
    const allSlides = document.querySelectorAll('li.slide')
    for (let i = 0; allSlides[i]; i++) {
        const video = allSlides[i].childNodes[0].childNodes[3]
        if (video.paused !== true) {
          video.pause()
        }
      }
    // get current slide after transition and set video to play
    this.timeout = setTimeout(function(){
      const activeSlide = document.querySelector('li.slide.selected')
      activeSlide.childNodes[0].childNodes[3].play()
    }, 800);

  }

  // quick way to make the first video in the slider play
  initalLoad(videos) {
    this.timeout = setTimeout(function () { videos[0].play(); }, 1000);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = null;
  }

  render() {

    const displayMoviesForSlider = () => {
      const movies = this.props.movies;
      return movies.map( (movie) => {
        // // console.log('movie: ', movie)
        return (
          <SlideData
            key={movie.id}
            id={movie.id}
            src={window.innerWidth > 768 ? movie.url : movie.urlMobile}
            title={movie.title}
            content={movie.content}
            poster={movie.urlPoster}
          />
        );
      });
    }

    return (
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={10000}
        transitionTime={600}
        onChange={this.onChange}
        useKeyboardArrows
        className="presentation-mode store-slider"
        dynamicHeight
        emulateTouch
      >
        {displayMoviesForSlider()}
      </Carousel>
    );
  }
}
