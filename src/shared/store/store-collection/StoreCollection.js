import React, { Component } from 'react';
import { connect } from 'react-redux';

import ShopMoreList from './../store-index/child-components/ShopMoreList';
import { Link } from 'react-router-dom';
import StoreMenu from './../store-index/child-components/StoreMenu';

import {
  getApparelCollections as getApparelCollectionsAction,
  getAccessoriesCollections as getAccessoriesCollectionsAction
} from '../../reusable/shopify/collection/actions';

import './assets/css/store-collection.css';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTruck } from '@fortawesome/fontawesome-free-solid'

class StoreCollection extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isMobile: false
    }

    this.handleResize = this.handleResize.bind(this);

  }

  componentWillMount() {
      if (this.props.match.params.collection === "accessories" || this.props.match.params.collection === "apparel") {
        if (this.props.accessories.length < 1 && this.props.match.params.collection === "accessories") this.props.getAccessoriesCollections();
        if (this.props.apparel.length < 1 && this.props.match.params.collection === "apparel") this.props.getApparelCollections();
      } 
      else {
        this.props.history.replace('/store')
      }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize()
  }

  handleResize() {
    if (window.innerWidth < 768) {
      this.setState({isMobile: true})
    } else {
      this.setState({isMobile: false})
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    // console.log('store collection: ', this.props)
    if (this.props.match.params.collection === 'accessories') {
      return (
        <section id="store-collection">
          <StoreMenu />
          <h3 className="free-shipping"><FontAwesomeIcon icon={faTruck} /> free shipping!</h3>
          <ol className="breadcrumbs">
            <li><Link to="/">home</Link></li>
            <li><Link to="/store">store</Link></li>
            <li className="active">{this.props.match.params.collection}</li>
          </ol>
          <article className="store-collection-list">
            <h1 className="store-collection-title">Accessories</h1>
            <ShopMoreList
              handle="accessories"
              products={this.props.accessories}
              isMobile={this.state.isMobile}
            />
          </article>
        </section>
      );
    } else if (this.props.match.params.collection === 'apparel') {
        return (
          <section id="store-collection">
            <StoreMenu />
            <h3 className="free-shipping"><FontAwesomeIcon icon={faTruck} /> free shipping!</h3>
            <ol className="breadcrumbs">
              <li><Link to="/">home</Link></li>
              <li><Link to="/store">store</Link></li>
              <li className="active">{this.props.match.params.collection}</li>
            </ol>
            <article className="store-collection-list">
              <h1 className="store-collection-title">Apparel</h1>
              <ShopMoreList
                handle="apparel"
                products={this.props.apparel}
                isMobile={this.state.isMobile}
              />
            </article>
          </section>
        );
    } else {
      return null
    }
  }
}

StoreCollection.defaultProps = {
  accessories:[],
  apparel: []
};

const mapStateToProps = ({ shopify }) => {
  return {
    accessories: shopify.collection.accessories,
    apparel: shopify.collection.apparel,
  };
};

export default connect(mapStateToProps, {
  getApparelCollections: getApparelCollectionsAction,
  getAccessoriesCollections: getAccessoriesCollectionsAction
})(StoreCollection)
