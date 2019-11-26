import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faTimesCircle } from '@fortawesome/fontawesome-free-solid'

import {
  getApparelCollections as getApparelCollectionsAction,
  getAccessoriesCollections as getAccessoriesCollectionsAction,
} from './../../../reusable/shopify/collection/actions';

import './../assets/css/store-menu.css';

class StoreMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      menuVisible: false,
    };

    this.handleShowStoreMenu = this.handleShowStoreMenu.bind(this);
  }

  handleShowStoreMenu(boolean) {
    this.setState({menuVisible: boolean})
  }

  componentDidMount() {
    if (this.props.accessories.length < 1 ) this.props.getAccessoriesCollections();
    if (this.props.apparel.length < 1 ) this.props.getApparelCollections();
  }

  render () {

    const {menuVisible} = this.state

    const buildAccessoriesMenu = () => {
      const sortAccessories = this.props.accessories.sort((a, b) => (a.handle > b.handle) ? 1 : -1) 
      const accessoriesCollections = sortAccessories.map(accessory => {
        return (
          <li><Link to={`/store/accessories/${accessory.handle}`} onClick={() => this.handleShowStoreMenu(false)}>{accessory.title}</Link></li>
        )
      })
      return (
        <div className="filter-property">
          <h6>Accessories</h6>
          <ul>
            {accessoriesCollections}
          </ul>
        </div>
      )
    }

    const buildApparelMenu = () => {
      const sortApparel = this.props.apparel.sort((a, b) => (a.handle > b.handle) ? 1 : -1) 
      const apparelCollections = sortApparel.map(apparel => {
        return (
          <li><Link to={`/store/apparel/${apparel.handle}`} onClick={() => this.handleShowStoreMenu(false)}>{apparel.title}</Link></li>
        )
      })
      return (
        <div className="filter-property">
          <h6>Apparel</h6>
          <ul>
            {apparelCollections}
          </ul>
        </div>
      )
    }

    const buildBowsMenu = () => {

      const bows = [
        {
          url: "kure",
          name: "KURE",
          index: 0
        },
        {
          url: "rezult",
          name: "REZULT",
          index: 0
        },
        {
          url: "ritual",
          name: "Ritual 35 Small Base",
          index: 3
        },
        {
          url: "valor",
          name: "Valor",
          index: 0
        },
        {
          url: "ritual",
          name: "Ritual 35",
          index: 2
        },
        {
          url: "ritual",
          name: "Ritual 30",
          index: 0
        },
        {
          url: "ritual",
          name: "Ritual 33",
          index: 1
        },
        {
          url: "revol",
          name: "Revol XL",
          index: 0
        },
        {
          url: "victory",
          name: "Victory X",
          index: 0
        },
        {
          url: "echelon",
          name: "Echelon 37",
          index: 0
        },
        {
          url: "echelon",
          name: "Echelon 39",
          index: 1
        },
      ]
      const bowModels = bows.map(bow => {
        return (
          <li><Link to={{pathname:`/elite-bows/${bow.url}/buy`, state:{bowIndex: bow.index} }} onClick={() => this.handleShowStoreMenu(false)}>{bow.name}</Link></li>
        )
      })
      return (
        <div className="filter-property">
          <h6>Bows</h6>
          <ul>
            {bowModels}
          </ul>
        </div>
      )
    }

    const buildStoreMenu = () => {
      return (
        <div className={menuVisible ? "store-menu-wrapper visible" : "store-menu-wrapper"}>
          <div className="store-menu">
          <img  className="elite-logo-black" src="https://elite-website.s3.amazonaws.com/v2/images/elite-logo-black.png" alt="elite-logo" />
            <button className="close-menu" onClick={() => this.handleShowStoreMenu(false)}><FontAwesomeIcon icon={faTimes} className="icon" />Close</button>
            {buildAccessoriesMenu()}
            {buildApparelMenu()}
            {buildBowsMenu()}
          </div>
        </div>
      )
    }

    return (
      <Fragment>
        <button className="show-menu" onClick={() => this.handleShowStoreMenu(true)}><FontAwesomeIcon icon={faBars} className="icon" />Store Menu</button>
        {buildStoreMenu()}
      </Fragment>
    )
  }
}

const mapStateToProps = ({ shopify }) => {
  return {
    accessories: shopify.collection.accessories,
    apparel: shopify.collection.apparel,
  };
};

export default connect(mapStateToProps, {
  getApparelCollections: getApparelCollectionsAction,
  getAccessoriesCollections: getAccessoriesCollectionsAction,
})(StoreMenu)