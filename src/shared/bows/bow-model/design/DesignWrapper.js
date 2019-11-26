import React, { Component } from 'react';
import DesktopDesign from './DesktopDesign';
import MobileDesign from './MobileDesign';

// decides whether to show mobile or desktop based on screen width
export default class DesignWrapper extends Component {

  constructor() {
    super();

    this.handleResize = this.handleResize.bind(this);

    this.state = {
      mobileTouchDevice: window.matchMedia("(hover:none) and (pointer:coarse), (hover:on-demand) and (pointer:coarse), (hover: none) and (pointer: fine), (hover:hover) and (pointer:coarse)").matches,
      windowSize: window.innerWidth
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componenWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({ windowSize: window.innerWidth });
  }

  render() {
    const { windowSize, mobileTouchDevice } = this.state;

    // window.matchMedia("(hover:none) and (pointer:coarse), (hover:on-demand) and (pointer:coarse), (hover: none) and (pointer: fine)").matches
    if (windowSize < 900 || mobileTouchDevice) {
      return (
        <MobileDesign bowName={this.props.bowFamily.name} />
      );
    } else {
      return <DesktopDesign bowName={this.props.bowFamily.name} />;
    }
  }

}
