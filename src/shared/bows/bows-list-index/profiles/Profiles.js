import React, { Component } from 'react';
import './assets/css/profiles.css';
import { Link } from 'react-router-dom';
import FullScreenVideo from '../../../reusable/FullScreenVideo';

import TweenMax from 'gsap/TweenMax';
import EasePack from 'gsap/src/uncompressed/easing/EasePack';
import scrollTo from 'gsap/ScrollToPlugin';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/fontawesome-free-solid';

export default class Profiles extends Component {

  constructor(props) {
    super(props);

    this.ul = null;
    this.hunterPanel = null;
    this.fieldPanel = null;
    this.threeDPanel = null;
    this.indoorPanel = null;
    this.bordwellPanel = null;
    this.mobileSliderInterval = null;

    this.getDimensions = this.getDimensions.bind(this);
    this.handlePanelClick = this.handlePanelClick.bind(this);
    this.playCurrentVideoClip = this.playCurrentVideoClip.bind(this);
    this.handleViewMovieClick = this.handleViewMovieClick.bind(this);
    this.handleCloseVideo = this.handleCloseVideo.bind(this);
    this.handleVideoClipEnd = this.handleVideoClipEnd.bind(this);
    this.activateScroll = this.activateScroll.bind(this);

    this.handleAssetType = this.handleAssetType.bind(this);

    // for mobile
    this.mobileSlide = this.mobileSlide.bind(this);

    this.state = {
      AnimatedFullScreenMovie: null,
      animatedFullScreenMoviePath: null,
      activePanel: null,
      counter: 0,
      assetType: null
    };

  }

  // NEED TO MAKE THIS SHIT ASYNC LOAD COMPONENT LIKE OTHER PROJECT


  handleAssetType(type) {
    console.log('type: ', type);

    // this.setState({ assetType: type });

    /*
     set the state of the type, and react with code if video (onComplete ) or img (setInterval)
    */
  }

  activateScroll() {

    if (this.state.assetType !== null) {
      if (this.state.assetType === "video") {
        const currentScrollPosition = this.ul.scrollLeft;
        TweenMax
          .to(this.ul, 0.75, { scrollTo: { x: this.state.activePanel.getBoundingClientRect().left + currentScrollPosition }, onComplete: () => this.playCurrentVideoClip( this.state.activePanel ) });
        TweenMax.to(this.state.activePanel.querySelector('header'), 0.85, { css: { left: 0, opacity: 1 }, ease: EasePack.Power2.easeInOut } );
      } else {
        const currentScrollPosition = this.ul.scrollLeft;
        TweenMax
          .to(this.ul, 0.75, { scrollTo: { x: this.state.activePanel.getBoundingClientRect().left + currentScrollPosition } });
        TweenMax.to(this.state.activePanel.querySelector('header'), 0.85, { css: { left: 0, opacity: 1 }, ease: EasePack.Power2.easeInOut } );
      }
    } else {
      return;
    }
  }

  handlePanelClick(event, name) {
    event ? event.preventDefault() : null;

    this.setState({ activePanel: name }, () => this.activateScroll() );
  }


  playCurrentVideoClip(el) {

    let allLiChildVidsNotCurrent = this.ul.querySelectorAll('li:not(el) article video');
    allLiChildVidsNotCurrent.forEach( video => video.pause() );

    let currentLiEndPos = el.getBoundingClientRect().left;
    let currentVideo = el.querySelector('video');

    if (currentLiEndPos < 0 || currentLiEndPos > 1 || !this.state.playVideo) currentVideo.pause();
    currentVideo.play();

  }

  // this is to view full movie
  handleViewMovieClick(event, name) {
    event.preventDefault();
      import('./../../../reusable/AnimatedFullScreenMovie').then(component => {
        switch(name) {
          case 'hunter':
          this.setState({
              AnimatedFullScreenMovie: component,
              animatedFullScreenMoviePath: "https://s3.amazonaws.com/elite-website/videos/meet-the-elite-profiles/biggs-spotlight.mp4"
            });
          break;

          case 'field':
            this.setState({
              AnimatedFullScreenMovie: component,
              animatedFullScreenMoviePath: "https://s3.amazonaws.com/elite-website/videos/meet-the-elite-profiles/mccoy-spotlight.mp4"
            });
          break;

          case 'threeD':
            this.setState({
              AnimatedFullScreenMovie: component,
              animatedFullScreenMoviePath: "https://s3.amazonaws.com/elite-website/videos/meet-the-elite-profiles/brooks-spotlight.mp4"
            });
          break;

          case 'indoor':
            this.setState({
              AnimatedFullScreenMovie: component,
              animatedFullScreenMoviePath: "https://s3.amazonaws.com/elite-website/videos/meet-the-elite-profiles/marlow-spotlight.mp4"
            });
          break;

          case 'bordwell':
            this.setState({
              AnimatedFullScreenMovie: component,
              animatedFullScreenMoviePath: "https://s3.amazonaws.com/elite-website/videos/meet-the-elite-profiles/bordwell-spotlight.mp4"
            });
          break;
        }
      });
  }

  handleVideoClipEnd(panel) {
    this.handlePanelClick(event, panel)
  }

  handleCloseVideo() {
    this.setState({
      AnimatedFullScreenMovie: null,
      animatedFullScreenMoviePath: null
    });
  }

  getDimensions() {
    if (this.state.activePanel !== null) {
      const currentScrollPosition = this.ul.scrollLeft;
      TweenMax.to(this.ul, 0, { scrollTo: { x: this.state.activePanel.getBoundingClientRect().left + currentScrollPosition }});
    }
  }

  mobileSlide() {
    if (this.state.counter < this.sliderNames.length - 1) {
      this.setState({
        counter: this.state.counter + 1
      });
    } else {
      this.setState({
        counter: 0
      });
    }
    this.handlePanelClick(null, this.sliderNames[this.state.counter]);
  }

  componentDidMount() {
    if (process.env.IS_BROWSER) {
      this.sliderNames = [this.hunterPanel, this.fieldPanel, this.threeDPanel, this.indoorPanel, this.bordwellPanel];

      if (this.state.windowWidth <= 768) {
        // this.mobileSliderInterval = setInterval( this.mobileSlide, 5000);
      }
    }
  }

  componentWillUnmount() {
    if (process.env.IS_BROWSER) {
      // clearInterval(this.mobileSliderInterval);
    }
    this.ul = null;
    this.hunterPanel = null;
    this.fieldPanel = null;
    this.threeDPanel = null;
    this.indoorPanel = null;
    this.bordwellPanel = null;
    this.mobileSliderInterval = null;
  }

  render() {

    const showProfileVideo = () => {
      if (typeof this.state.AnimatedFullScreenMovie !== undefined && this.state.AnimatedFullScreenMovie !== null) {
        const AnimatedFullScreenMovie = this.state.AnimatedFullScreenMovie.default;
        return (<AnimatedFullScreenMovie
          videoSrc={this.state.animatedFullScreenMoviePath}
          closeVideo={this.handleCloseVideo}
        />);
      } else {
        return null;
      }
    }

    const setClass = (num) => {
      if (num === this.state.counter) {
        return "active";
      } else {
        null;
      }
    }

    return (
      <section className="video-slider">
        { showProfileVideo() }
        <header>
          <h3>Meet the Elite</h3>
        </header>
        <ul ref={ul => this.ul = ul}>
          <li ref={ hunterPanel => this.hunterPanel = hunterPanel }>
            <article>
              <FullScreenVideo
                handleEnd={() => this.handleVideoClipEnd(this.fieldPanel) }
                src={"https://s3.amazonaws.com/elite-website/videos/meet-the-elite-profiles/biggs-spotlight-preview.mp4"}
                autoPlay={true}
                playsInline={true}
                posterSrc={"https://s3.amazonaws.com/elite-website/videos/meet-the-elite-profiles/posters/biggs-spotlight-preview.jpg"}
                muted={true}
                handleAssetType={this.handleAssetType}
              />
              <div>
                <header><h4>Ritual 30</h4></header>
                <p><Link to="https://respectthegame.tv/" target="_blank">Respect The Game</Link> TV Star <Link to="https://respectthegame.tv/pages/paul-biggs" target="_blank">Paul Biggs</Link> talks about the advantages of the all new for 2018 <Link to="/elite-bows/ritual/overview">Ritual 30</Link> Bow in hunting situations.</p>
                <p><a href="#" onClick={() => this.handleViewMovieClick(event, 'hunter')}><FontAwesomeIcon icon={faPlayCircle} size="lg" /> Watch the film</a></p>
              </div>
            </article>

          </li>
          <li ref={ fieldPanel => this.fieldPanel = fieldPanel }>
            <article>
              <FullScreenVideo
                handleEnd={() => this.handleVideoClipEnd(this.threeDPanel) }
                src={"https://s3.amazonaws.com/elite-website/videos/meet-the-elite-profiles/mccoy-spotlight-preview.mp4"}
                autoPlay={false}
                playsInline={true}
                posterSrc={"https://s3.amazonaws.com/elite-website/videos/meet-the-elite-profiles/posters/mccoy-spotlight-preview.jpg"}
                muted={true}
                handleAssetType={this.handleAssetType}
              />
              <div>
                <header><h4>Ritual 33</h4></header>
                <p><Link to="https://respectthegame.tv/" target="_blank">Respect The Game</Link> TV Star <Link to="https://respectthegame.tv/pages/larry-mccoy" target="_blank">Larry McCoy</Link> explains why the <Link to="/elite-bows/ritual/overview">Ritual 33 Bow</Link> allows him to shoot with confidence.</p>
                <p><a href="#" onClick={() => this.handleViewMovieClick(event, 'field')}><FontAwesomeIcon icon={faPlayCircle} size="lg" /> Watch the film</a></p>
              </div>
            </article>
          </li>
          <li ref={ threeDPanel => this.threeDPanel = threeDPanel }>
            <article>
              <FullScreenVideo
                handleEnd={() => this.handleVideoClipEnd(this.indoorPanel) }
                src={"https://s3.amazonaws.com/elite-website/videos/meet-the-elite-profiles/brooks-spotlight-preview.mp4"}
                autoPlay={false}
                playsInline={true}
                posterSrc={"https://s3.amazonaws.com/elite-website/videos/meet-the-elite-profiles/posters/brooks-spotlight-preview.jpg"}
                muted={true}
                handleAssetType={this.handleAssetType}
              />
              <div>
                <header><h4>Victory X</h4></header>
                <p>Elite Pro Shooter Nathan Brooks shares some insights as to why the <Link to="/elite-bows/victory/overview">Victory X</Link> is the most shooter friendly bow he's seen in over 20 years of competitive archery.</p>
                <p><a href="#" onClick={() => this.handleViewMovieClick(event, 'threeD')}><FontAwesomeIcon icon={faPlayCircle} size="lg" /> Watch the film</a></p>
              </div>
            </article>
          </li>
          <li ref={ indoorPanel => this.indoorPanel = indoorPanel }>
            <article>
              <FullScreenVideo
                handleEnd={() => this.handleVideoClipEnd(this.bordwellPanel) }
                src={"https://s3.amazonaws.com/elite-website/videos/meet-the-elite-profiles/marlow-spotlight-preview.mp4"}
                autoPlay={false}
                playsInline={true}
                posterSrc={"https://s3.amazonaws.com/elite-website/videos/meet-the-elite-profiles/posters/marlow-spotlight-preview.jpg"}
                muted={true}
                handleAssetType={this.handleAssetType}
              />
              <div>
                <header><h4>Victory X</h4></header>
                <p>Elite Pro Shooter Tyler Marlow explains how the <Link to="/elite-bows/victory/overview">Victory X</Link>'s amazing grip, infinite adjustments, and ability to get the holding weight exactly where he wants it leads to success.</p>
                <p><a href="#" onClick={() => this.handleViewMovieClick(event, 'indoor')}><FontAwesomeIcon icon={faPlayCircle} size="lg" /> Watch the film</a></p>
              </div>
            </article>
          </li>
          <li className="gray" ref={ bordwellPanel => this.bordwellPanel = bordwellPanel }>
            <article>
              <FullScreenVideo
                handleEnd={() => this.handleVideoClipEnd(this.hunterPanel) }
                src={"https://s3.amazonaws.com/elite-website/videos/meet-the-elite-profiles/bordwell_spotlight-preview.mp4"}
                autoPlay={false}
                playsInline={true}
                posterSrc={"https://s3.amazonaws.com/elite-website/videos/meet-the-elite-profiles/posters/bordwell_spotlight-preview.jpg"}
                muted={true}
                handleAssetType={this.handleAssetType}
              />
              <div>
                <header><h4>Echelon Series</h4></header>
                <p>Elite Pro Shooter Glen Bordwell speaks about how the <Link to="/elite-bows/echelon/overview">Echelon</Link> series offers limb and cable stops, lots of let-off, and maximum tuning ability to give you the competitive edge.</p>
                <p><a href="#" onClick={() => this.handleViewMovieClick(event, 'bordwell')}><FontAwesomeIcon icon={faPlayCircle} size="lg" /> Watch the film</a></p>
              </div>
            </article>
          </li>
        </ul>

        <ul>
          <li><a className={ setClass(0) } onClick={() => this.handlePanelClick(event, this.hunterPanel)}><span className="hidden-visually"></span></a></li>
          <li><a className={ setClass(1) } onClick={() => this.handlePanelClick(event, this.fieldPanel)}><span className="hidden-visually"></span></a></li>
          <li><a className={ setClass(2) } onClick={() => this.handlePanelClick(event, this.threeDPanel)}><span className="hidden-visually"></span></a></li>
          <li><a className={ setClass(3) } onClick={() => this.handlePanelClick(event, this.indoorPanel)}><span className="hidden-visually"></span></a></li>
          <li><a className={ setClass(4) } onClick={() => this.handlePanelClick(event, this.bordwellPanel)}><span className="hidden-visually"></span></a></li>
        </ul>
      </section>
    );
  }
}
