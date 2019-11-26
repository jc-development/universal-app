import React, { Component } from 'react';
import { BowLogo } from './child-components/BowLogo';
import MonthlyPayment from '../../../../../../klarna/MonthlyPayment';
import MoreInfo from './child-components/more-info/MoreInfo';

import BowModelButtons from './child-components/choose-model/BowModelButtons';
import ColorFinishes from './child-components/riser-limb-finish/RiserLimbFinishes';
import Specs from './child-components/specs/Specs';
import Accessories from './child-components/accessories/Accessories';
import AddToCart from './child-components/add-to-cart/AddToCart';

import './assets/css/config-panel.css';

export default class ConfigPanel extends Component {
  constructor() {
    super();

    this.state = {
      component: null,
      props: null,
      clickedNav: "model",
      showMobileNav: false,
      currentIndex: 0, // initially first item is model component to load
      componentArray: null,
      firstSection: {position: null},
      secondSection: {position: null},
      thirdSection: {position: null},
      fourthSection: {position: null},
      fifthSection: {position: null},
    };

    this.handleBowInfoClick = this.handleBowInfoClick.bind(this);
    this.handleTitleSticky = this.handleTitleSticky.bind(this);
  }


  handleBowInfoClick() {
    this.setState({
      showInfoWindow: !this.state.showInfoWindow
    })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleTitleSticky)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleTitleSticky)
  }

  handleTitleSticky () {
    const wrapperTop = this.configPanelWrapper.offsetTop;

    const firstSection = this.configPanelWrapper.childNodes[1];
    const secondSection = this.configPanelWrapper.childNodes[2];
    const thirdSection = this.configPanelWrapper.childNodes[3];
    const fourthSection = this.configPanelWrapper.childNodes[4];
    const fifthSection = this.configPanelWrapper.childNodes[5];

    const checkSection = (section, sectionNumber) => {
      let sectionTitleHeight = section.childNodes[0].getBoundingClientRect().height

      if(sectionNumber === "fifthSection") {
        const childNodesExist = section.childNodes[0].childNodes[0].childNodes[0].hasChildNodes();
        if (childNodesExist) {
          sectionTitleHeight = section.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].getBoundingClientRect().height
        } else {
          sectionTitleHeight = section.childNodes[0].childNodes[0].getBoundingClientRect().height
        }
      }
      // if scroll position beyond top of section - make fixed or absolute
      if (window.scrollY >= section.offsetTop) {
        // check if scroll postion is beyond section
        if (window.scrollY >= (section.offsetTop + section.getBoundingClientRect().height) - sectionTitleHeight && this.state[sectionNumber].position !== "absolute") {
          this.setState({
            [sectionNumber]: {
              position: "absolute",
              sectionPadding: {
                paddingTop: `${sectionTitleHeight}px`
              }
            },
          })
        } else
        if (window.scrollY <= (section.offsetTop + section.getBoundingClientRect().height) - sectionTitleHeight && this.state[sectionNumber].position !== "fixed") {
          this.setState({
            [sectionNumber]: {
              position: "fixed",
              sectionTitleTop: {
                top: `calc(${wrapperTop}px - 1px)`,
              },
              sectionPadding: {
                paddingTop: `${sectionTitleHeight}px`
              }
            }
          })
        }
      } else if (this.state[sectionNumber].position !== null) {
        this.setState({[sectionNumber]: {position: null}})
      }
    }

    checkSection(firstSection, "firstSection")
    checkSection(secondSection, "secondSection")
    checkSection(thirdSection, "thirdSection")
    checkSection(fourthSection, "fourthSection")
    checkSection(fifthSection, "fifthSection")
  }

  render() {
    // console.log('this.props ConfigPanel: ', this.props.currentHand);

    const klarnaReady = () => {
      return (
        <div className="klarna-heading-wrapper">
          <MonthlyPayment id={`config-panel-${this.props.currentBow.modelNameUrl}`} amount={`${this.props.currentBow.msrp}00`} accessories={this.props.accessories}/>
        </div>
      )
    }

    return (
      <div id="panel-wrapper" ref={configPanelWrapper => this.configPanelWrapper = configPanelWrapper}>
        <header>
          <h3 ref={configPanelTitle => this.configPanelTitle = configPanelTitle}>{this.props.currentBow.name} builder</h3>
          { klarnaReady() }
        </header>
        { this.state.componentArray !== null && this.props.isMobile ? previousStep() : null }
        <BowModelButtons
          firstSection={this.state.firstSection}
          bowNames={this.props.bowNames}
          compareBowModels={this.props.compareModelBows}
          currentBow={this.props.currentBow}
          updateBow={this.props.updateBow}
        />
        <ColorFinishes
          secondSection={this.state.secondSection}
          riserFinishes={this.props.currentBow.techSpecs.finishes.riser}
          limbFinishes={this.props.currentBow.techSpecs.finishes.limbs}
          updateColor={this.props.updateColor}
          currentRiserColor={this.props.currentRiserColor}
          currentLimbColor={this.props.currentLimbColor}
          currentBow={this.props.currentBow}
        />
        <Specs
          thirdSection={this.state.thirdSection}
          drawLengths={this.props.currentBow.techSpecs.drawLengths}
          drawWeights={this.props.currentBow.techSpecs.peakWeights}
          setLength={this.props.updateLength}
          setWeight={this.props.updateWeight}
          setHandOrientation={this.props.updateHandOrientation}
          currentLength={this.props.currentLength}
          currentWeight={this.props.currentWeight}
          currentHand={this.props.currentHand}
          currentBowModel={this.props.currentBow.modelNameUrl}
        />
        <Accessories
          fourthSection={this.state.fourthSection}
          currentRiserColor={this.props.currentRiserColor}
          currentHand={this.props.currentHand}
          selectProduct={this.props.selectProduct}
        />
        <AddToCart
          fifthSection={this.state.fifthSection}
        />
      </div>
    );
  }
}
