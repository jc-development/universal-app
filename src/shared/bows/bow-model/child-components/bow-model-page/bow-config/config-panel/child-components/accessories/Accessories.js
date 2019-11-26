import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBowAccessories as fetchBowAccessoriesAction } from './assets/utils/bow-accessories-actions';
import { filterColors } from './child-components/filter-colors/FilterColors';

import Quiver from './child-components/quiver/Quiver';
import Stabilizer from './child-components/stabilizer/Stabilizer';
import Rest from './child-components/rest/Rest';
import Sling from './child-components/sling/Sling';
import Arrow from './child-components/arrow/Arrow';
import BowCase from './child-components/bowcase/BowCase';

import './assets/css/accessories.css';
import { Link } from 'react-router-dom';

class Accessories extends Component {

  constructor() {
    super();

    this.handleLoadComponentClick = this.handleLoadComponentClick.bind(this);
    this.splitAccessoriesIntoCategory = this.splitAccessoriesIntoCategory.bind(this);

    this.state = {
      clickedNav: "quivers",
      quivers: [],
      stabilizers: [],
      rests: [],
      slings: [],
      bowCases: [],
      arrows: [],
    };
  }

  handleLoadComponentClick(clickedNav) {
    this.setState({clickedNav})
  }

  splitAccessoriesIntoCategory(riserColor) {

    const splitter = (array, category) => {
      return array.filter( edge => {
        if (edge.node.tags.includes(category)) {
          return edge.node.variants.edges;
        }
      });
    };

    const edges = this.props.bowAccessories.edges;
    this.setState({
      quivers: filterColors( "quiver", splitter(edges, "Quiver"), riserColor ),
      stabilizers: filterColors( "stabilizer", splitter(edges, "Stabilizer"), riserColor ),
      rests: filterColors( "rest", splitter(edges, "Rest"), riserColor ),
      slings: filterColors( "wrist-sling", splitter(edges, "Sling"), riserColor ),
      bowCases: filterColors( "bowCases", splitter(edges, "Bow Case"), riserColor),
      arrows: filterColors( "arrows", splitter(edges, "Arrows"), riserColor )
    });
  }

  componentWillMount() {
    // if (!this.props.bowAccessories.edges || this.props.bowAccessories.edges.length < 1) {
      this.props.fetchBowAccessories();
    // }
  }


  componentDidUpdate(prevProps, nextState) {
    // initial when edges come in with data
    if (prevProps.bowAccessories.edges !== this.props.bowAccessories.edges) this.splitAccessoriesIntoCategory(this.props.currentRiserColor.color.colorName);

    // when the riser color changes
    if (prevProps.currentRiserColor.color.colorName !== this.props.currentRiserColor.color.colorName) {
      this.splitAccessoriesIntoCategory(this.props.currentRiserColor.color.colorName);
    }
  }



  render () {
    // console.log('this.props.bowAccessories: ', this.props.bowAccessories)
    // console.log('this.state.component Accessories: ', this.state);

    const checkClassName = (name) => this.state.clickedNav === name ? "active" : null;

    const accessoryNavNodes = () => {
        return (
          <nav id="accessories-menu">
            <ul>
              { this.state.quivers.length > 0 ? <li className={checkClassName("quivers")} onClick={ () => this.handleLoadComponentClick("quivers") }>Quivers</li> : null}
              { this.state.stabilizers.length > 0 ? <li className={checkClassName("stabilizers")}onClick={ () => this.handleLoadComponentClick("stabilizers") }>Stabilizers</li> : null }
              { this.state.rests.length > 0 ? <li className={checkClassName("rests")} onClick={ () => this.handleLoadComponentClick("rests") }>Arrow Rests</li> : null }
              { this.state.slings.length > 0 ? <li className={checkClassName("wrist slings")} onClick={ () => this.handleLoadComponentClick("wrist slings") }>Wrist Slings</li> : null }
              { this.state.arrows.length > 0 ? <li className={checkClassName("arrows")} onClick={ () => this.handleLoadComponentClick("arrows") }>Arrows</li> : null }
              { this.state.bowCases.length > 0 ? <li className={checkClassName("bow cases")} onClick={ () => this.handleLoadComponentClick("bow cases") }>Bow Cases</li> : null }
            </ul>
          </nav>
        );
    };

    const showComponent = () => {
      switch(this.state.clickedNav) {
        case "stabilizers":
          return <Stabilizer stabilizers={this.state.stabilizers} selectProduct={this.props.selectProduct} />;

        case "rests":
          return <Rest rests={this.state.rests} currentHand={this.props.currentHand} selectProduct={this.props.selectProduct} />;

        case "wrist slings":
          return <Sling slings={this.state.slings} selectProduct={this.props.selectProduct} />;

        case "arrows":
          return <Arrow arrows={this.state.arrows} selectProduct={this.props.selectProduct} />;

        case "bow cases":
          return <BowCase bowCases={this.state.bowCases} selectProduct={this.props.selectProduct} />;

        default:
          return <Quiver quivers={this.state.quivers} selectProduct={this.props.selectProduct} />;
      }
    }

    const handleTitleClass = () => {
      if (this.props.fourthSection.position === "fixed") {
        return "section-title-fixed"
      } else if (this.props.fourthSection.position === "absolute") {
        return "section-title-absolute"
      } else {
        return null
      }
    }

    const handleTitleStyle = () => {
      if (this.props.fourthSection.position === "fixed") {
        return this.props.fourthSection.sectionTitleTop
      } else {
        return null
      }
    }

    return (
      <div id="accessories-menu-wrapper"  style={this.props.fourthSection.position !== null ? this.props.fourthSection.sectionPadding : null}>
        <h5 className={handleTitleClass()} style={handleTitleStyle()}>Accessorize Your Bow</h5>
        { accessoryNavNodes() }
        <div>{ showComponent() }</div>
      </div>
    );
  }
}

Accessories.defaultProps = {
  bowAccessories: {
    edges: []
  },
  customerConfiguredBowModel: {}
};

const mapStateToProps = ({ bowAccessories, customerConfiguredBowModel }) => ({ bowAccessories, customerConfiguredBowModel });

export default connect(mapStateToProps, { fetchBowAccessories: fetchBowAccessoriesAction })(Accessories);
