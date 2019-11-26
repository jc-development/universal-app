import React, { Component } from 'react';

import kuiuLogoSrc from './assets/images/kuiu-logo.jpg';
import mossyOakLogoSrc from './assets/images/mossyoak-logo.jpg';
import realTreeLogoSrc from './assets/images/realtree-logo.jpg';
import rhinodizeLogoSrc from './assets/images/rhinodize-logo.jpg';

import './assets/css/riser-limb-finishes.css';

export default class RiserLimbFinishes extends Component {
  constructor() {
    super();

    this.state = {
      activePart: null,
      colorTypeFinishes: null,
      matchingColors: null,
      activeColor: null,
      riserColor: "Ninja Black",
      limbColor: "Ninja Black"
    };

    this.handleColorSwatchClick = this.handleColorSwatchClick.bind(this);
  }

  handleColorSwatchClick(node, colorType) {
    this.props.updateColor(node);

    // handle Kure Camo color for riser and limbs
    if(this.props.currentBow.name === "Kure") {
      if(colorType === 'camo') {
        const matchingCamo = Object.keys(node)[0] === 'riser' ? {['limb']: {['color']: node.riser.color }} : {['riser']: {['color']: node.limb.color, image: `https://s3.amazonaws.com/elite-website/${this.props.currentBow.modelYear}/${this.props.currentBow.modelNameUrl}/images/bows/${node.limb.color.swatchUrl.substring(node.limb.color.swatchUrl.lastIndexOf('/') + 1, node.limb.color.swatchUrl.lastIndexOf('.'))}.png`}}
        this.props.updateColor(matchingCamo);
      } else {
        const blackPart = Object.keys(node)[0] === 'riser' ? {['limb']: {['color']: { colorName:"Ninja Black", skuCode:"at", swatchUrl:"https://s3.amazonaws.com/elite-website/v2/images/outdoors-colors/black.jpg", patternName:"Ninja Black"}}} : {['riser']: {['color']: { colorName:"Ninja Black", skuCode:"at", swatchUrl:"https://s3.amazonaws.com/elite-website/v2/images/outdoors-colors/black.jpg", patternName:"Ninja Black"}, image: "https://s3.amazonaws.com/elite-website/2020/kure/images/bows/ninja-black.png"}}
        this.props.updateColor(blackPart);
      }
    }

  }

  render() {

    // console.log('RISERLIMBFINISHES this.props:::: ', this.props);

    const loadCamoLogo = (name) => {
      switch (name) {
        case 'Realtree':
          return <img className="camo-partner" src={realTreeLogoSrc} title="RealTree Camo Colors" alt="RealTree Camo Colors" />;

        case 'KUIU':
          return <img className="camo-partner" src={kuiuLogoSrc} title="KUIU Camo Colors" alt="KUIU Camo Colors" />;

        case 'Mossy Oak':
          return <img className="camo-partner" src={mossyOakLogoSrc} title="Mossy Oak Camo Colors" alt="Mossy Oak Camo Colors" />;

        case 'Rhinodize':
          return <img className="rhinodize" src={rhinodizeLogoSrc} title="Rhinodize Target Colors" alt="Rhinodize Target Colors" />;

        default:
          break;
      }
    };

    const colorTypeNodes = (colors) => {
      return Object.values(colors)[0].map( brand => {
        return (<div>
                  <h4>{ brand.brands[0].type } { Object.keys(colors)[0] === 'riser' ? 'Riser Colors' : 'Limb Colors'}</h4>
                    { colorBrandNodes({ [Object.keys(colors)[0]]: brand }) }
                </div>);
      });
    };

    const filter = (colors) => {
      return Object.values(colors)[1].brands.map( color => {
        if (Object.keys(colors)[1] === color.name) {
          return {[ Object.values(colors)[0] ] : color };
        }
      });
    };

    const determineExclusiveMessage = (colorBrand) => {
      if (colorBrand.name === "Exclusive Decoration") {
        console.log('this.props: ', this.props);
        if (this.props.currentBow.name === "Ritual 30") {
          return <span style={ {opacity: 0.5, fontSize: '80%'} }>* Limited production: Only available on Ritual 30, Right Hand, 70 lbs draw.</span>
        } else {
          return <span style={ {opacity: 0.5, fontSize: '80%'} }>* Limited production: Only available on Ritual 35, Right Hand, 60 lbs draw.</span>
        }
      } else {
        return null;
      }
    }

    const colorBrandNodes = (brand) => {
      return Object.values(brand)[0].brands.map( colorBrand => {
        return (
          <dl>
            <dt>{ loadCamoLogo(colorBrand.name) } { (colorBrand.name !== "Realtree" && colorBrand.name !== "KUIU" && colorBrand.name !== "Mossy Oak" && colorBrand.name !== "Rhinodize") ? colorBrand.name : null }</dt>
            <div className="swatch-wrapper">
              { colorSwatches(filter(
                {
                  type: Object.keys(brand)[0],
                  [`${colorBrand.name}`]: Object.values(brand)[0]
                }
              ).filter( node => { if (node) { return node } } )) }
              {determineExclusiveMessage(colorBrand)}
            </div>
          </dl>
        );
      });
    };

    const filterColorPart = (color) => {
      if (Object.values(color)[0] === this.props[`current${Object.keys(color)[0].charAt(0).toUpperCase() + Object.keys(color)[0].slice(1)}Color`].color.colorName ) {
        return "active";
      } else {
        return null;
      }
    }

    const isActive = (color) => {
      return filterColorPart(color);
    }

    const colorSwatches = (colorFinishes) => {

      let colorFinish = Object.values(colorFinishes)[0];
      let partName = Object.keys(colorFinish)[0];
      let colorType = colorFinish[Object.keys(colorFinish)[0]].type

      return colorFinish[Object.keys(colorFinish)[0]].finishes.map( (finish, i) => {
          return (
            <dd key={i} className={isActive( {[partName]: finish.color.colorName} )}>
              <img
                onClick={() => this.handleColorSwatchClick({[partName]: finish}, colorType)}
                src={finish.color.swatchUrl}
                alt={finish.color.colorName}
                title={finish.color.colorName}
              />
              <span>{ finish.color.colorName }</span>
            </dd>
          );
        });
    };

    const handleTitleClass = () => {
      if (this.props.secondSection.position === "fixed") {
        return "section-title-fixed"
      } else if (this.props.secondSection.position === "absolute") {
        return "section-title-absolute"
      } else {
        return null
      }
    }

    const handleTitleStyle = () => {
      if (this.props.secondSection.position === "fixed") {
        return this.props.secondSection.sectionTitleTop
      } else {
        return null
      }
    }

    return (
      <div id="finish-wrapper" style={this.props.secondSection.position !== null ? this.props.secondSection.sectionPadding : null}>
        <h5 className={handleTitleClass()} style={handleTitleStyle()}>Select Color Finish {this.props.currentBow.name === "Kure" ? <small>* Camo limbs are only available with a camo riser</small> : ""}</h5>
        <div className="finish-layout">
          <div>
            <h3>Riser</h3>
              { colorTypeNodes({riser: this.props.riserFinishes}) }
          </div>

          <div>
            <h3>Limbs</h3>
            { colorTypeNodes({limb: this.props.limbFinishes}) }
          </div>
        </div>
      </div>
    );
  }

}
