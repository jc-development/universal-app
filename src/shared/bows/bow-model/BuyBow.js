import React, { Component } from 'react';
import { connect } from 'react-redux';
import BowViewPanel from './child-components/bow-model-page/bow-config/bow-view/BowViewPanel';
import ConfigPanel from './child-components/bow-model-page/bow-config/config-panel/ConfigPanel';

import { setBowModel as setBowModelAction, setBowSku as setBowSkuAction } from './bow-model-actions';
import { setRiserColor as setRiserColorAction } from './child-components/bow-model-page/bow-config/config-panel/child-components/riser-limb-finish/assets/utils/riser-actions';
import { setLimbColor as setLimbColorAction } from './child-components/bow-model-page/bow-config/config-panel/child-components/riser-limb-finish/assets/utils/limb-actions';
import { setLength as setLengthAction, setWeight as setWeightAction, setHand as setHandAction } from './child-components/bow-model-page/bow-config/config-panel/child-components/specs/assets/utils/specs-actions';

// Accessories
import { setQuiver as setQuiverAction } from './child-components/bow-model-page/bow-config/config-panel/child-components/accessories/child-components/quiver/quiver-actions';
import { setStabilizer as setStabilizerAction } from './child-components/bow-model-page/bow-config/config-panel/child-components/accessories/child-components/stabilizer/stabilizer-actions';
import { setSling as setSlingAction } from './child-components/bow-model-page/bow-config/config-panel/child-components/accessories/child-components/sling/sling-actions';
import { setRest as setRestAction } from './child-components/bow-model-page/bow-config/config-panel/child-components/accessories/child-components/rest/rest-actions';
import { setArrow as setArrowAction } from './child-components/bow-model-page/bow-config/config-panel/child-components/accessories/child-components/arrow/arrow-actions';
import { setBowCase as setBowCaseAction } from './child-components/bow-model-page/bow-config/config-panel/child-components/accessories/child-components/bowcase/bowcase-actions';

import { deleteBowAccessory as deleteBowAccessoryAction } from './child-components/bow-model-page/bow-config/config-panel/child-components/accessories/assets/utils/bow-accessories-actions';

import './child-components/bow-model-page/assets/css/buy-bow.css';

class BuyBow extends Component {

  constructor(props) {
    super(props);

    this.handleViewClick = this.handleViewClick.bind(this);
    this.handleUpdateBow = this.handleUpdateBow.bind(this);
    this.handleColorSwatchClick = this.handleColorSwatchClick.bind(this);
    this.handleLengthClick = this.handleLengthClick.bind(this);
    this.handleWeightClick = this.handleWeightClick.bind(this);
    this.handleHandOrientationClick = this.handleHandOrientationClick.bind(this);
    this.handleProductSelected = this.handleProductSelected.bind(this);

    this.setBowProps = this.setBowProps.bind(this);

    this.handleRemoveAccessory = this.handleRemoveAccessory.bind(this);

    this.handleNullImages = this.handleNullImages.bind(this);
    this.handleBowScrollCSS = this.handleBowScrollCSS.bind(this);

    this.state = {
      viewMode: "hi-res",
      bow: null,
      bowSku: null,
      riserColor: null,
      limbColor: null,
      length: null,
      weight: null,
      hand: 'right',
      isViewPanelOverflow: false,
    };

  }

  handleViewClick(name) {
    this.setState({
      viewMode: name
    })
  }

  handleUpdateBow(name) {
    const bow = this.props.bowFamily.bows.find( bow => {
      return bow.name === name;
    });

    // console.log('bow clicked first draw length: ', bow.techSpecs.drawLengths[0]);

    this.setState({
      bow,
      bowSku: bow.skuCode,
      riserColor: bow.techSpecs.finishes.riser[0].brands[0].finishes[0],
      limbColor: bow.techSpecs.finishes.limbs[0].brands[0].finishes[0],
      length: bow.techSpecs.drawLengths[0],
      weight: bow.techSpecs.peakWeights[0]
    }, () => {
      this.setBowProps(this.state);
    });
  }

  handleColorSwatchClick(color) {
    this.setState({
      [`${Object.keys(color)[0]}Color`]: Object.values(color)[0]
    }, () => this.props[`set${Object.keys(color)[0].charAt(0).toUpperCase() + Object.keys(color)[0].slice(1)}Color`](Object.values(color)[0].color.skuCode) );
  }

  handleLengthClick(length) {
    this.setState({ length });
    this.props.setLength(length);
  }

  handleWeightClick(weight) {
    this.setState({ weight });
    this.props.setWeight(weight);
  }

  handleHandOrientationClick(hand) {
    this.setState({ hand });
    this.props.setHand(hand);
  }

  handleProductSelected(product) {
    switch(Object.keys(product)[0]) {
      case 'quiver':
        this.props.setQuiver(Object.values(product)[0]);
        break;

      case 'stabilizer':
        this.props.setStabilizer(Object.values(product)[0]);
        break;

      case 'rest':
        this.props.setRest(Object.values(product)[0]);
        break;

      case 'sling':
        this.props.setSling(Object.values(product)[0]);
        break;

      case 'bowCase':
        this.props.setBowCase(Object.values(product)[0]);
        break;

      case 'arrow':
        this.props.setArrow(Object.values(product)[0]);
        break;

      default:
        break;
    }
  }

  handleNullImages(name) {
    // console.log('handleNullImages');
    this.setState({
      viewMode: name,
      nullImgMenu: true
    })
  }

  handleBowScrollCSS() {

    const bowViewPanelWrapperHeight = this.bowViewPanelWrapper.getBoundingClientRect().height
    const viewPanelHeight = this.viewPanel.getBoundingClientRect().height
    const wrapperHeightMinusBow = bowViewPanelWrapperHeight - viewPanelHeight
    const windowScrollPosition = window.scrollY

    if (windowScrollPosition >= wrapperHeightMinusBow && !this.state.isViewPanelOverflow) {
      this.setState({ isViewPanelOverflow: true });
    }
    else if(windowScrollPosition < wrapperHeightMinusBow && this.state.isViewPanelOverflow) {
      this.setState({ isViewPanelOverflow: false });
    } else {
      null;
    }

  }

  handleRemoveAccessory(accessory) {
    // console.log('remove accessory in BuyBow: ', accessory);

    this.setBowProps(this.state)
    this.props.deleteBowAccessory(accessory);
  }

  setBowProps(properties) {
    this.props.setBowModel(properties.bow);
    this.props.setBowSku(properties.bowSku);
    this.props.setRiserColor(properties.riserColor.color.skuCode);
    this.props.setLimbColor(properties.limbColor.color.skuCode);
    this.props.setLength(properties.length);
    this.props.setWeight(properties.weight);
    this.props.setHand(properties.hand);
  }

  componentDidMount() {
    // if click on bow in comparison on /overview, load the particular bow model.
    if (this.props.location.state) {
      this.setState({
        bow: this.props.bowFamily.bows[this.props.location.state.bowIndex] || null,
        bowSku: this.props.bowFamily.bows[this.props.location.state.bowIndex].skuCode,
        riserColor: this.props.bowFamily.bows[this.props.location.state.bowIndex].techSpecs.finishes.riser[0].brands[0].finishes[0],
        limbColor: this.props.bowFamily.bows[this.props.location.state.bowIndex].techSpecs.finishes.limbs[0].brands[0].finishes[0],
        length: this.props.bowFamily.bows[this.props.location.state.bowIndex].techSpecs.drawLengths[0],
        weight: this.props.bowFamily.bows[this.props.location.state.bowIndex].techSpecs.peakWeights[0],
        hand: 'right'
      }, () => {
        this.setBowProps(this.state);
      });
    } else {
      this.setState({
        bow: this.props.bowFamily.bows[0] || null,
        bowSku: this.props.bowFamily.bows[0].skuCode,
        riserColor: this.props.bowFamily.bows[0].techSpecs.finishes.riser[0].brands[0].finishes[0],
        limbColor: this.props.bowFamily.bows[0].techSpecs.finishes.limbs[0].brands[0].finishes[0],
        length: this.props.bowFamily.bows[0].techSpecs.drawLengths[0],
        weight: this.props.bowFamily.bows[0].techSpecs.peakWeights[0],
        hand: 'right'
      }, () => {
        this.setBowProps(this.state);
      });
    }

    window.addEventListener('scroll', this.handleBowScrollCSS)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleBowScrollCSS)
  }

  render() {
    // console.log('this.props.fetchBuildSummary BUY BOW: ', this.props)
    // console.log('this.state BuyBow: ', this.state.hand);

    if (this.state.bow !== null && this.props.bowFamily.name) {

      const getBowNames = (bows) => {
        return bows.map( bow => {
          return bow.name;
        });
      };

      return (
        <section id='buy-bow' style={this.props.isBowSubmenuFixed ? {paddingTop: this.props.bowSubMenuHeight} : null}>

          <div className="bow-builder-grid">

            <div id="bow-view-panel" ref={bowViewPanelWrapper => this.bowViewPanelWrapper = bowViewPanelWrapper}>
              <BowViewPanel
                showNullMenu={this.state.nullImgMenu}
                viewMode={this.state.viewMode}
                viewClick={this.handleViewClick}

                isMobile={this.state.isMobile}
                setViewForNullImg={this.handleNullImages}
                isBowSubmenuFixed={this.props.isBowSubmenuFixed}
                refViewPanel={viewPanel => this.viewPanel = viewPanel}
                isViewPanelOverflow={this.state.isViewPanelOverflow}

                currentBow={this.state.bow}
                currentRiserColor={this.state.riserColor}
                currentLimbColor={this.state.limbColor}
                currentLength={this.state.length}
                currentWeight={this.state.weight}
                currentHand={this.state.hand}
                updateBow={this.handleUpdateBow}
                accessories={this.props.customerConfiguredBowModel.accessories}

                removeBowAccessory={this.handleRemoveAccessory}
              />
            </div>

            <div id="bow-config-panel">
              <ConfigPanel
                bowNames={ getBowNames(this.props.bowFamily.bows) }
                currentBow={this.state.bow}
                currentRiserColor={this.state.riserColor}
                currentLimbColor={this.state.limbColor}
                currentLength={this.state.length}
                currentWeight={this.state.weight}
                currentHand={this.state.hand}
                updateBow={this.handleUpdateBow}
                updateColor={this.handleColorSwatchClick}
                updateLength={this.handleLengthClick}
                updateWeight={this.handleWeightClick}
                updateHandOrientation={this.handleHandOrientationClick}
                compareModelBows={this.props.bowFamily.compareModels.bows}
                isMobile={this.state.isMobile}
                match={this.props.match}
                selectProduct={this.handleProductSelected}
                accessories={this.props.customerConfiguredBowModel.accessories}
              />
            </div>
          </div>
        </section>
      );
    } else {
      return null;
    }

  }
}

const mapStateToProps = ({ customerConfiguredBowModel }) => ({ customerConfiguredBowModel });

export default connect(mapStateToProps,
  {
    setBowModel: setBowModelAction,
    setBowSku: setBowSkuAction,
    setRiserColor: setRiserColorAction,
    setLimbColor: setLimbColorAction,
    setLength: setLengthAction,
    setWeight: setWeightAction,
    setHand: setHandAction,
    setQuiver: setQuiverAction,
    setStabilizer: setStabilizerAction,
    setSling: setSlingAction,
    setRest: setRestAction,
    setArrow: setArrowAction,
    setBowCase: setBowCaseAction,
    deleteBowAccessory: deleteBowAccessoryAction
  }
)(BuyBow);
