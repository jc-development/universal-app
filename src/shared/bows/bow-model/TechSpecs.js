import React, { Component } from 'react';
import { BowRiserSizeVariantButtons } from './child-components/bow-model-page/tech-specs/BowRiserSizeVariantButtons';
import { BowRiserColorVariantImages } from './child-components/bow-model-page/tech-specs/BowRiserColorVariantImages';
import { ModChart } from './child-components/bow-model-page/tech-specs/ModChart';
import { ReusableTechSpecListing } from './../../reusable/ReusableTechSpecListing';
import _isEqual from 'lodash/isEqual';

import './child-components/bow-model-page/assets/css/tech-specs.css';

export default class TechSpecs extends Component {
  constructor(props) {
    super(props);

    this.handleBowSizeSwitch = this.handleBowSizeSwitch.bind(this);

    this.state = {
      bow: null,
      bowIndex: 0
    };
  }

  handleBowSizeSwitch(name) {
    const bow = this.props.bowFamily.bows.find( bow => {
      return bow.name === name;
    });
    const bowIndex = this.props.bowFamily.bows.findIndex((bow, i) => {
      return bow.name === name;
    });
    this.setState({ bow, bowIndex });
  }

  componentDidMount() {
    this.setState({
      bow: this.props.bowFamily.bows[0]
    })
  }

  render() {

      // console.log('this.state: ', this.state);
      // console.log('this.props.bowFamily: ', this.props.bowFamily)

if (this.state.bow !== null) {
    const getPeakWeights = () => {
      return this.state.bow.techSpecs.peakWeights
        .map( weight => {
          return `${weight} lbs`;
        })
        .join(', ');
    };

    const getUses = () => {
      return this.state.bow.techSpecs.useTypes
        .map( useType => {
          return useType.name;
        })
        .join(', ');
    };

    const getBowNames = (bows) => {
      return bows.map( bow => {
        return bow.name;
      });
    };


        return (
        <section id="bow-tech-specs">
          <BowRiserSizeVariantButtons
            bowNames={ getBowNames(this.props.bowFamily.bows) }
            switchBow={this.handleBowSizeSwitch}
            currentBowName={this.state.bow.name}
          />
          <BowRiserColorVariantImages images={this.state.bow.techSpecs.finishes.riser} familyName={this.props.bowFamily.name} bowIndex={this.state.bowIndex}/>
          <ReusableTechSpecListing
            h3={"Price"}
            p={`$${this.state.bow.msrp}`}
          />

          <ReusableTechSpecListing
            h3={"Axle to Axle"}
            p={this.state.bow.techSpecs.axleToAxle}
          />

          <ReusableTechSpecListing
            h3={"Brace Height"}
            p={this.state.bow.techSpecs.brace}
          />

          <ReusableTechSpecListing
            h3={"String Length"}
            p={this.state.bow.techSpecs.stringLength}
          />

          <ReusableTechSpecListing
            h3={"Cable Length"}
            p={this.state.bow.techSpecs.cableLength}
          />

          {
            this.state.bow.techSpecs.centerShot ? 
              <ReusableTechSpecListing
                h3={"Centershot"}
                p={this.state.bow.techSpecs.centerShot}
              />
            :
              null
          }

          <ReusableTechSpecListing
            h3={"Peak Weights"}
            p={ getPeakWeights() }
          />

          <ReusableTechSpecListing
            h3={"Mass Weight"}
            p={`${this.state.bow.techSpecs.weight} lbs`}
          />

          <ReusableTechSpecListing
            h3={"Let-off"}
            p={this.state.bow.techSpecs.letOff}
          />

          <ReusableTechSpecListing
            h3={"Uses"}
            p={ getUses() }
          />

          <ModChart
            modColumnTitle={"Cam & Mod"}
            speedRatingColumnTitle={"IBO Speed"}
            modStatsArray={this.state.bow.techSpecs.mods}
            tFoot={["IBO FPS Speed ratings measured with a #70 350 grain arrow", " Deduct 2-3 fps from rating for #60 peak weight (300 grain arrow)"]}
          />

        </section>
      );
    } else { return null }


    }
}
