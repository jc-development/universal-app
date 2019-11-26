import React, { Component } from 'react';
import Intro from './children/Intro';
import Cams from './children/Cams';
import Set from './children/Set';
import Limbs from './children/Limbs';
import StabilockPockets from './children/StabilockPockets';

import './assets/css/design.css';

export default class MobileDesign extends Component {

  render() {

    const { bowName } = this.props;

    const setBowName = () => bowName === "ReZult" ? "rezult" : "kure";

    return (
      <div id="design-main-wrapper" className="mobile">

        <Intro isMobile={true} bowName={this.props.bowName} />

        <div id={`${ setBowName() }-more-content-wrapper`}>
          <Cams camsRef={ (ref) => this.camsRef = ref } isMobile={true} bowName={this.props.bowName} />
          <Set setRef={ (ref) => this.setRef = ref } isMobile={true} bowName={this.props.bowName} />
          <Limbs limbsRef={ (ref) => this.limbsRef = ref } isMobile={true} bowName={this.props.bowName} />
          <StabilockPockets stabilockPocketRef={ (ref) => this.stabilockPocketRef = ref } isMobile={true} bowName={this.props.bowName} />
        </div>

      </div>
    );
  }
}
