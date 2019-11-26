import React, { Component } from 'react';
import './assets/css/fullscreen-video.css';

export default class FullScreenVideo extends Component {

  constructor() {
    super();

    this.handleResize = this.handleResize.bind(this);

    this.state = {
      windowSize: null
    }
  }

  handleResize() {
    this.setState({ windowSize: window.innerWidth });
  }

  componentDidMount() {
    if (process.env.IS_BROWSER) {
      this.handleResize();

      window.addEventListener('resize', this.handleResize);
    }
  }

  componentWillMount() {
    if (process.env.IS_BROWSER) {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  render() {

    if (this.state.windowSize !== null && this.state.windowSize < 768) {
        return (
          <img
            src={this.props.posterSrc}
            alt={"Elite Pro Shooters and Hunters speak about their favorite Elite bow"}
            assetType={ this.props.handleAssetType("img") }
          />
        );
    } else {
      return (
        <video
          className={`fullscreen-video ${this.props.styleClass ? this.props.styleClass : ''}`}
          src={this.props.src}
          onEnded={this.props.handleEnd}
          playsInline={this.props.playsInline}
          controls={this.props.controls}
          poster={this.props.posterSrc}
          muted={this.props.muted}
          autoPlay={this.props.autoPlay}
          assetType={ this.props.handleAssetType("video") }
        />
      );
    }
  }
}
