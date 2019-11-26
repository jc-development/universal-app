import React, { Component } from 'react';

export default class Video extends Component {

  constructor(props) {
    super(props);

    this.video;
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      hasPlayed: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const isVideoInViewPort = () => (this.video.getBoundingClientRect().top < window.innerHeight / 3 && this.video.getBoundingClientRect().top > 0);

    if ( isVideoInViewPort() && this.state.hasPlayed === false) {
        const playPromise = this.video.play();

        if (playPromise !== undefined) {
          playPromise.then( () => {
            this.video.play();
            this.setState({ hasPlayed: true }, () => window.removeEventListener('scroll', this.handleScroll) );
          })
          .catch(error => {
            this.video.pause();
            console.log('error on playback: ', error);
          });
        }
    }

  }

  render() {
    const { cssClassName, videoSrc, posterSrc } = this.props.data;
    return (
      <video playsInline ref={ el => this.video = el } className={cssClassName} preload="auto" muted="muted" poster={posterSrc}>
        <source type="video/mp4" src={videoSrc} />
      </video>
    );
  }
}
