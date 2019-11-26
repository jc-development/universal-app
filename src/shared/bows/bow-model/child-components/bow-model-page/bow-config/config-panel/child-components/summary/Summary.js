import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchBuildSummary as fetchBuildSummaryAction } from './build-summary-actions';

import './assets/css/summary.css';

class Summary extends Component {

  componentWillMount() {
    this.props.fetchBuildSummary();
  }

  render() {
    // console.log('this.props in summary: ', this.props);
    const showSummaryNodes = () => {
      const bow = this.props.customerConfiguredBowModel.bowModel;
      const bowImage = this.props.customerConfiguredBowModel.riserColor.image;
      return (
        <Fragment>
        <img src={bowImage}  alt={`Elite Archery ${bow.name}`}/>
        <ul>
          <li>Bow Model: {bow.name}</li>
          <hr />
          <li>Riser Color Finish: {this.props.customerConfiguredBowModel.riserColor.color.colorName}</li>
          { this.props.customerConfiguredBowModel.limbColor.color ? <li>Limb Color Finish: {this.props.customerConfiguredBowModel.limbColor.color.colorName}</li> : null}
          <hr />
          <li>Draw Length: {this.props.customerConfiguredBowModel.length} inches</li>
          <li>Draw Weight: {this.props.customerConfiguredBowModel.weight} lbs</li>
          <li>Hand Orientation: {this.props.customerConfiguredBowModel.hand}</li>
          <hr />
        </ul>
        </ Fragment>
      );
    };

    const showAccessorieNodes = () => {
      const accessories = this.props.customerConfiguredBowModel.accessories;

      const quiverNodes = () => {

        const showQuiverNodes = () => {
          if (accessories.quivers.length > 0) {
            return accessories.quivers.map( (quiver, i) => {
              return <li key={i}><img src={quiver.node.image.src} alt={quiver.node.title} /> <p>{quiver.node.product.title} {quiver.node.title !== "Default Title" ? quiver.node.title : null}</p></li>;
            });
          } else {
            return <li>No quivers selected</li>;
          }
        };

        return (
          <div>
            <h6>Quivers</h6>
            <ul>
             { showQuiverNodes() }
            </ul>
          </div>
        );
      };

      const stabilizerNodes = () => {

        const showStabilizerNodes = () => {
          if (accessories.stabilizers.length > 0) {
            return accessories.stabilizers.map( (stabilizer, i) => {
              return <li key={i}><img src={stabilizer.node.image.src} alt={stabilizer.node.title}/> <p>{stabilizer.node.product.title} {stabilizer.node.title !== "Default Title" ? stabilizer.node.title : null}</p></li>;
            });
          } else {
            return <li>No stabilizers selected</li>;
          }
        };

        return (
          <div>
            <h6>Stabilizers</h6>
            <ul>
              { showStabilizerNodes() }
            </ul>
          </div>
        );
      };


      const arrowRestNodes = () => {

        const showArrowRestNodes = () => {
          if (accessories.arrowRests.length > 0) {
            return accessories.arrowRests.map( (arrowRest, i) => {
              return <li key={i}><img src={arrowRest.node.image.src} alt={arrowRest.node.title}/> <p>{arrowRest.node.product.title} {arrowRest.node.title !== "Default Title" ? arrowRest.node.title : null}</p></li>;
            });
          } else {
            return <li>No arrow rests selected</li>;
          }
        };

        return (
          <div>
            <h6>Arrow Rests</h6>
            <ul>
              { showArrowRestNodes() }
            </ul>
          </div>
        );
      };

      const slingNodes = () => {

        const showSlingNodes = () => {
          if (accessories.slings.length > 0) {
            return accessories.slings.map( (sling, i) => {
              return <li key={i}><img src={sling.node.image.src} alt={sling.node.title}/> <p>{sling.node.product.title} {sling.node.title !== "Default Title" ? sling.node.title : null}</p></li>;
            });
          } else {
            return <li>No slings selected</li>;
          }
        };

        return (
          <div>
            <h6>Wrist Slings</h6>
            <ul>
              { showSlingNodes() }
            </ul>
          </div>
        );
      };

      const arrowNodes = () => {

        const showArrowNodes = () => {
          if (accessories.arrows.length > 0) {
            return accessories.arrows.map( (arrow, i) => {
              return <li key={i}><img src={arrow.node.image.src} alt={arrow.node.title}/> <p>{arrow.node.product.title} {arrow.node.title !== "Default Title" ? arrow.node.title : null}</p></li>;
            });
          } else {
            return <li>No arrows selected</li>;
          }
        };

        return (
          <div>
            <h6>Arrows</h6>
            <ul>
              { showArrowNodes() }
            </ul>
          </div>
        );
      };

      const bowCaseNodes = () => {

        const showBowCaseNodes = () => {
          if (accessories.bowCases.length > 0) {
            return accessories.bowCases.map( (bowCase, i) => {
              return <li key={i}><img src={bowCase.node.image.src} alt={bowCase.node.title}/> <p>{bowCase.node.product.title} {bowCase.node.title !== "Default Title" ? bowCase.node.title : null}</p></li>;
            });
          } else {
            return <li>No bow cases selected</li>;
          }
        };

        return (
          <div>
            <h6>Bow Cases</h6>
            <ul>
              { showBowCaseNodes() }
            </ul>
          </div>
        );
      };


      return (
        <div>
          <h5>Accessories</h5>
          { quiverNodes() }
          <hr />
          { stabilizerNodes() }
          <hr />
          { arrowRestNodes() }
          <hr />
          { slingNodes() }
          <hr />
          { arrowNodes() }
          <hr />
          { bowCaseNodes() }
        </div>
      );
    };


    return (
      <div id="bow-config-summary">
        <h5>Bow Configuration Summary</h5>
         {this.props.customerConfiguredBowModel ? showSummaryNodes() : null }
         { this.props.customerConfiguredBowModel.accessories ? showAccessorieNodes() : null }
      </div>
    );
  }

}

// Summary.defaultProps = {
//   configSummary: {}
// };

const mapStateToProps = ({ customerConfiguredBowModel }) => ({ customerConfiguredBowModel });

export default connect(mapStateToProps, { fetchBuildSummary: fetchBuildSummaryAction })(Summary);
