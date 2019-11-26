import React, { Component } from 'react';
import BowCad from './BowCad';
import MonthlyPayment from '../../../../../../klarna/MonthlyPayment';

import TimelineMax from 'gsap/TimelineMax';
import { Power3 } from 'gsap/src/uncompressed/easing/EasePack';

import '../../assets/css/bow-view-panel.css';

export default class BowViewPanel extends Component {

  constructor() {
    super();

    this.button;
    this.buttonTimeline = new TimelineMax({ yoyo: true, repeat: 1, repeatDelay: 1});

    this.state = {
      showBuildSummary: false,
      isMobileForBuildSummary: false,
    }

    this.handleResizeCheckForBuildSummary = this.handleResizeCheckForBuildSummary.bind(this);
    this.handleMobileBuildSummaryButtonClick = this.handleMobileBuildSummaryButtonClick.bind(this);

    this.handleRemoveAccessory = this.handleRemoveAccessory.bind(this);

    this.propsChange = this.propsChange.bind(this);
  }

  handleRemoveAccessory(accessory) {
    this.props.removeBowAccessory(accessory);
  }

  handleResizeCheckForBuildSummary() {
    if (window.innerWidth <= 1023 && !this.state.isMobileForBuildSummary) {
      this.setState({
        isMobileForBuildSummary: true,
      });
    } else if(window.innerWidth >= 1024 && this.state.isMobileForBuildSummary) {
      this.setState({
        isMobileForBuildSummary: false,
        showBuildSummary: false
      })
    }
  }

  handleMobileBuildSummaryButtonClick() {
    this.setState({
      showBuildSummary: !this.state.showBuildSummary,
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResizeCheckForBuildSummary);
    this.handleResizeCheckForBuildSummary();

  }

  propsChange(prevProps, currentProps) {

    if (prevProps.currentRiserColor.color.colorName !== currentProps.currentRiserColor.color.colorName) {
      return true;
    }

    if (prevProps.currentLimbColor.color.colorName !== currentProps.currentLimbColor.color.colorName) {
      return true;
    }

    if (prevProps.currentLength !== currentProps.currentLength) {
      return true;
    }

    if (prevProps.currentWeight !== currentProps.currentWeight) {
      return true;
    }

    if (prevProps.currentHand !== currentProps.currentHand) {
      return true;
    }

    if (prevProps.accessories.arrowRests !== currentProps.accessories.arrowRests) {
      return true;
    }

    if (prevProps.accessories.arrows !== currentProps.accessories.arrows) {
      return true;
    }

    if (prevProps.accessories.bowCases !== currentProps.accessories.bowCases) {
      return true;
    }

    if (prevProps.accessories.quivers !== currentProps.accessories.quivers) {
      return true;
    }

    if (prevProps.accessories.slings !== currentProps.accessories.slings) {
      return true;
    }

    if (prevProps.accessories.stabilizers !== currentProps.accessories.stabilizers) {
      return true;
    }

  }

  componentDidUpdate(prevProps, nextState) {

    if ( !!this.propsChange(prevProps, this.props) ) {

      if(this.button) {
        this.buttonTimeline
          .fromTo(this.button, 2, {
            backgroundColor: "#ffffff",
            color: "#000000",
            ease: Power3.easeInOut
          },
          {
            backgroundColor: "#337ab7",
            color: "#ffffff",
            ease: Power3.easeInOut
          });
      }
    }

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResizeCheckForBuildSummary);
  }

  render() {

    // console.log('this.props BowViewPanel: ', this.props);


    const renderDL = () => {
      return (
        <dl id="view-panel">
          {!this.props.showNullMenu ?
            <React.Fragment>
              {this.state.isMobileForBuildSummary ? null : <dt>view settings</dt>}
              <dd><button onClick={() => this.props.viewClick("3d")} className={checkClassName("3d")}>3d</button></dd>
              {this.props.currentRiserColor.image !== null ? <dd><button onClick={() => this.props.viewClick("hi-res")} className={checkClassName("hi-res")}>hi-res</button></dd> : null}
            </React.Fragment>
          : null}
        </dl>
      );
    };

    const renderComponent = () => {
      if (this.props.viewMode === "3d") {
        return <BowCad cadPath={this.props.currentBow.cadPath} riserColor={this.props.currentRiserColor} limbColor={this.props.currentLimbColor} bowName={this.props.currentBow.name} bowImage={this.props.currentRiserColor.image}/>
      } else {
        if(this.props.currentRiserColor.image !== null) {
          return <img src={this.props.currentRiserColor.image} alt={`Elite Archery ${this.props.currentBow.name} Riser in ${this.props.currentRiserColor.color.colorName}`} />
        } else {
          this.props.viewClick("3d")
        }
      }
    };

    const checkClassName = (name) => name === this.props.viewMode ? "active" : null;

    const styleViewPanel = () => {
      if(this.props.isBowSubmenuFixed && !this.props.isViewPanelOverflow) {
        return {
          position: "fixed",
          width: "50vw"
        };
      } else if (this.props.isBowSubmenuFixed && this.props.isViewPanelOverflow) {
        return {
          position: "absolute",
          width: "50vw",
          bottom: 0
        };
      } else {
        return null;
      }
    };

    const accessoryNodes = (accessories) => {
      return Object.values(accessories)[0].map(accessory => {
        return <dd className='bow-accessory'>{accessory.node.product.title}: {accessory.node.title} <span onClick={() => this.handleRemoveAccessory({ [Object.keys(accessories)[0]]: accessory})}>remove</span></dd>;
      })
    };

    const displayMessage = () => {
      let lengthArr = [];
      let accessoriesLength = this.props.accessories.length;
      for (let accessory in this.props.accessories) {
        lengthArr.push(this.props.accessories[accessory].length)
      };

      let filteredArr = lengthArr.map(lengthResult => {
        if (lengthResult === 0) {
          return lengthResult;
        }
      }).filter( item => item === 0);

      if (filteredArr.length === lengthArr.length) {
        return <p>None selected</p>;
      } else {
        return null;
      }
    };

    const renderBuildSummary = () => {
      const buildSummary = () => {
        return (
          <div id="build-summary" className={this.state.isMobileForBuildSummary ? "mobile" : null }>
            <h6>{this.props.currentBow.name} Build</h6>
            {this.state.isMobileForBuildSummary ? <button className="close" onClick={this.handleMobileBuildSummaryButtonClick}>CLOSE</button> : null}
            {/* <dl>
              <dt>Monthly Payment</dt>
              <dd>As low as $67/month with Klarna</dd>
            </dl> */}
            <div className="klarna-heading-wrapper">
              <MonthlyPayment id={`view-panel-${this.props.currentBow.modelNameUrl}`} amount={`${this.props.currentBow.msrp}00`} accessories={this.props.accessories}/>
            </div>
            <dl>
              <dt>Bow Specs</dt>
              <dd>FPS: {this.props.currentBow.techSpecs.speedRating}</dd>
              <dd>Axle to Axle: {this.props.currentBow.techSpecs.axleToAxle}</dd>
              <dd>Mass Weight: {this.props.currentBow.techSpecs.weight} lbs.</dd>
              <dd>Brace: {this.props.currentBow.techSpecs.brace} inches</dd>
            </dl>
            <dl>
              <dt>Bow Color</dt>
              <dd>Riser Finish: {this.props.currentRiserColor.color.colorName}</dd>
              <dd>Limb Finish: {this.props.currentLimbColor.color.colorName}</dd>
            </dl>
            <dl>
              <dt>User Specs</dt>
              <dd>Draw Length: { this.props.currentBow.modelNameUrl === 'kure' || this.props.currentBow.modelNameUrl === 'rezult' ? `Adjustable from ${this.props.currentBow.techSpecs.drawLengths[0]} - ${this.props.currentBow.techSpecs.drawLengths[this.props.currentBow.techSpecs.drawLengths.length - 1]}` :this.props.currentLength} inches</dd>
              <dd>Draw Weight: {this.props.currentWeight} lbs.</dd>
              <dd>Hand: {this.props.currentHand.charAt(0).toUpperCase()+this.props.currentHand.slice(1)}</dd>
            </dl>

            <h6>Accessories</h6>
            { displayMessage() }

            { this.props.accessories.quivers && this.props.accessories.quivers.length > 0 ?
              <dl>
                <dt>Quivers:</dt>
                {accessoryNodes({quivers: this.props.accessories.quivers})}
              </dl>
            : null }

            { this.props.accessories.stabilizers && this.props.accessories.stabilizers.length > 0 ?
              <dl>
                <dt>Stabilizer:</dt>
                {accessoryNodes({stabilizers: this.props.accessories.stabilizers})}
              </dl>
            : null }

            {this.props.accessories.arrowRests && this.props.accessories.arrowRests.length > 0 ?
              <dl>
                <dt>Rest:</dt>
                 {accessoryNodes({arrowRests: this.props.accessories.arrowRests})}
              </dl>
            : null }

            { this.props.accessories.slings && this.props.accessories.slings.length > 0 ?
              <dl>
                <dt>Sling:</dt>
                {accessoryNodes({slings: this.props.accessories.slings})}
              </dl>
            : null }

            { this.props.accessories.arrows && this.props.accessories.arrows.length > 0 ?
              <dl>
                <dt>Arrows:</dt>
                {accessoryNodes({arrows: this.props.accessories.arrows})}
              </dl>
            : null }

            { this.props.accessories.bowCases && this.props.accessories.bowCases.length > 0 ?
              <dl>
                <dt>Bow Case:</dt>
                {accessoryNodes({bowCases: this.props.accessories.bowCases})}
              </dl>
            : null }
          </div>
        );
      }
      if(this.state.isMobileForBuildSummary) {
        if(this.state.showBuildSummary) {
          return buildSummary()
        } else {
          return null
        }
      } else {
        return buildSummary()
      }
    };

  const renderMobileBuildSummaryButton = () => {
      if (this.state.isMobileForBuildSummary) {
        return <button ref={el => this.button = el} className="build-summary-btn" onClick={this.handleMobileBuildSummaryButtonClick}>Build Summary</button>
      } else {
        return null
      }
    }

    const renderMobileMonthlyPayment = () => {
      if (this.state.isMobileForBuildSummary) {
        return <MonthlyPayment id={`view-panel-under-bow-${this.props.currentBow.modelNameUrl}`} className="klarna-mobile-below-bow" amount={`${this.props.currentBow.msrp}00`} accessories={this.props.accessories}/>
      } else {
        return null
      }
    }

    return (
      <div id="view-panel-wrapper" ref={this.props.refViewPanel} style={styleViewPanel()}>
        { renderDL() }
        { renderMobileBuildSummaryButton() }
        { renderComponent() }
        { renderBuildSummary() }
        { renderMobileMonthlyPayment () }
      </div>
    );
  }
}
