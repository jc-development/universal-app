import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import {
//   fetchSliderContainerTitle as fetchSliderContainerTitleAction,
//   fetchSlidersContent as fetchSlidersContentAction
// } from './actions';

import { ImageSlider } from './children/ImageSlider';
import { SliderControlPanel } from './children/SliderControlPanel';

import './assets/css/slider-container.css';

/*
  This is a parent component to hold individual images or video for the store
*/

export default class SliderContainer extends Component {

  // componentWillMount() {
    // this.props.fetchSliderContainerTitle(/* match path in here */);
    // this.props.fetchSlidersContent(/* will need params */)
  // }

  render() {
    return (
      <section className="slider-container">
        <header>
          {/* title of slider container; should remain fixed while content slides */}
          <h1>Featured Clothing</h1>
        </header>
        {/* this is a slider */}
        <article>
          {/* image or video */}
          <ImageSlider />
        </article>
        <SliderControlPanel />
      </section>
    );
  }

}


//
// const mapStateToProps = ({ sliderContainerTitle, sliderContent }) => ({
//   sliderContainerTitle,
//   sliderContent
// });
//
// export default connect connect( mapStateToProps, {
//   fetchSliderContainerTitle: fetchSliderContainerTitleAction,
//   fetchSlidersContent: fetchSlidersContentAction
// })(SliderContainer);
