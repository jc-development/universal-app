import React, { Component } from 'react';
import OverviewHeader from './child-components/bow-model-page/OverviewHeader';
import TimelineMax from 'gsap/TimelineMax';
// import { clearBowModel as clearBowModelAction } from './bow-model-actions';

export default  class BowModelOverview extends Component {

  constructor(props) {
    super(props);

    this.overviewHeaderRef = null;
    this.bowSizeCompareRef = null;
    this.dualVideoRef = null;
    this.performanceRef = null;
    this.drawCycleChartRef = null;
    this.aboutCamRef = null;
    this.accessoriesImageRef = null;
    this.imageGalleryRef = null;

    this.state = {
      BowSizeCompareComponent: null,
      DualVideoComponent: null,
      PerformanceComponent: null,
      DrawCycleChartComponent: null,
      AboutCamComponent: null,
      AccessoriesImageComponent: null,
      ImageGalleryComponent: null,
      bowSizeCompareCounter: 0,
      // dualVideoCounter: 0,
      performanceCounter: 0,
      drawCycleChartCounter: 0,
      aboutCamCounter: 0,
      accessoriesImageCounter: 0,
      imageGalleryCounter: 0
    };

    this.timeline = new TimelineMax();

    this.setOverviewRef = this.setOverviewRef.bind(this);
    this.setBowSizeCompareRef = this.setBowSizeCompareRef.bind(this);
    // this.setDualVideoRef = this.setDualVideoRef.bind(this);
    this.setPerformanceRef = this.setPerformanceRef.bind(this);
    this.setDrawCycleChartRef = this.setDrawCycleChartRef.bind(this);
    this.setAboutCamRef = this.setAboutCamRef.bind(this);
    this.setAccessoriesImageRef = this.setAccessoriesImageRef.bind(this);
    this.setImageGalleryRef = this.setImageGalleryRef.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleActivateComponent = this.handleActivateComponent.bind(this);
    this.importFactory = this.importFactory.bind(this);

    this.activateTimeline = this.activateTimeline.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    this.overviewHeaderRef = null;
    this.bowSizeCompareRef = null;
    this.dualVideoRef = null;
    this.performanceRef = null;
    this.drawCycleChartRef = null;
    this.aboutCamRef = null;
    this.accessoriesImageRef = null;
    this.imageGalleryRef = null;
    this.timeline = null;
  }

  activateTimeline(name) {
    this.timeline.fromTo(this[`${name}Ref`], 1, {autoAlpha: 0}, {autoAlpha: 1, onComplete: this.setState({ [`${name}Counter`]: 1 }) } );
  }

  handleActivateComponent(name) {
    if (this[`${name}Ref`] && this.state[`${name}Counter`] === 0) {
      this.activateTimeline(name);
    }
  }

  importFactory(existingRef, importComponentName, futureRefName) {
    if (this[`${existingRef}Ref`].getBoundingClientRect().bottom <= window.innerHeight / 1.25) {
      import(`./child-components/bow-model-page/${importComponentName}`).then(component => {
        this.setState({
          [`${importComponentName}Component`]: component
        }, () => {
          if (this.state[`${futureRefName}Counter`] === 0) {
            this.handleActivateComponent(`${futureRefName}`);
          }
        });
      });
    }
  }

  handleScroll() {

    if (this.overviewHeaderRef) {
      this.importFactory('overviewHeader', 'BowSizeCompare', 'bowSizeCompare');
    }

    if (this.bowSizeCompareRef) {
      this.importFactory('bowSizeCompare', 'Performance', 'performance');
      // use when dual video is enabled: this.importFactory('bowSizeCompare', 'DualVideo', 'dualVideo');
    }

    // if (this.dualVideoRef) {
    //   this.importFactory('dualVideo', 'Performance', 'performance');
    // }

    if (this.performanceRef) {
      this.importFactory('performance', 'DrawCycleChart', 'drawCycleChart');
    }

    if (this.drawCycleChartRef) {
      this.importFactory('drawCycleChart', 'AboutCam', 'aboutCam');
    }

    if (this.aboutCamRef) {
      this.importFactory('aboutCam', 'AccessoriesImage', 'accessoriesImage');
    }

    if (this.accessoriesImageRef) {
      this.importFactory('accessoriesImage', 'ImageGallery', 'imageGallery');
    }
  }

  setOverviewRef(ref) {
    this.overviewHeaderRef = ref;
  }

  setBowSizeCompareRef(ref) {
    this.bowSizeCompareRef = ref;
  }

  // setDualVideoRef(ref) {
  //   this.dualVideoRef = ref;
  // }

  setPerformanceRef(ref) {
    this.performanceRef = ref;
  }

  setDrawCycleChartRef(ref) {
    this.drawCycleChartRef = ref;
  }

  setAboutCamRef(ref) {
    this.aboutCamRef = ref;
  }

  setAccessoriesImageRef(ref) {
    this.accessoriesImageRef = ref;
  }

  setImageGalleryRef(ref) {
    this.imageGalleryRef = ref;
  }

  render() {

    // console.log('BOWMODELOVERVIEW THIS.PROPS: ', this.props);
    // this.props.bowfamily is null; hasn't been created yet.

    const showComponent = (componentName, refObj, props) => {
      if (this.state[componentName] && this.state[componentName] !== null) {
        const Component = this.state[componentName].default;
        return (
          <Component {...refObj}  />
        );
      } else {
        return null;
      }
    };

    if (this.props.bowFamily !== null) {
      return (
        <section>
          {this.props.bowFamily.name ? <OverviewHeader bowFamilyName={this.props.bowFamily.name} overviewRef={this.setOverviewRef} overview={this.props.bowFamily.overview} headerVideo={this.props.bowFamily.headerVideo} headerVideoPoster={this.props.bowFamily.headerVideoPoster} highlights={this.props.bowFamily.highlights} msrp={this.props.bowFamily.bows[0].msrp} /> : null }
          { showComponent('BowSizeCompareComponent', { bowSizeCompareRef: this.setBowSizeCompareRef, familyName: this.props.bowFamily.name, compareModels: this.props.bowFamily.compareModels }) }
          {/* showComponent('DualVideoComponent', { dualVideoRef: this.setDualVideoRef }) */}
          { showComponent('PerformanceComponent', { performanceRef: this.setPerformanceRef, performance: this.props.bowFamily.performance, seriesSlider: this.props.bowFamily.seriesSlider,  useTypes: this.props.bowFamily.bows[0].techSpecs.useTypes }) }
          { showComponent('DrawCycleChartComponent', { drawCycleChartRef: this.setDrawCycleChartRef }) }
          { showComponent('AboutCamComponent', { aboutCamRef: this.setAboutCamRef, aboutCam: this.props.bowFamily.aboutCam }) }
          { showComponent('AccessoriesImageComponent', {accessoriesImageRef: this.setAccessoriesImageRef, bowFamilyName: this.props.bowFamily.name, accessoriesImage: this.props.bowFamily.shopAccessoriesImage })}
          { showComponent('ImageGalleryComponent', { imageGalleryRef: this.setImageGalleryRef, imageGallery: this.props.bowFamily.beautyImageGallery }) }
        </section>
      );
    } else {
      return (
        <section>
          <h1>Only The Design Tab works</h1>
          <p>This bow model is under development check back soon for full data set.</p>
        </section>
      );
    }
  }
}
