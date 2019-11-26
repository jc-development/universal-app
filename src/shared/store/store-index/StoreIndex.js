import React, { Component, Fragment } from 'react';
import ShopMoreList from './child-components/ShopMoreList';
import FeaturedProductRow from './child-components/FeaturedProductRow';
import StoreMenu from './child-components/StoreMenu';

import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

// import HatBuilder from './../../hat-builder/HatBuilder';

import './assets/css/store-index.css';
import loaderImg from './../assets/images/loader-img.jpg';

import {
  getApparelCollections as getApparelCollectionsAction,
  getAccessoriesCollections as getAccessoriesCollectionsAction,
  getFeaturedCollections as getFeaturedCollectionsAction
} from '../../reusable/shopify/collection/actions';

class StoreIndex extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isMobile: false
    }

    this.handleResize = this.handleResize.bind(this);
  }

  componentWillMount() {
    // separate fetch to get featured collections with products - speeds up store index page
    if (this.props.featuredAccessories.products.length < 1 || this.props.featuredApparel.products.length < 1) this.props.getFeaturedCollections();
    if (this.props.accessories.length < 1 ) this.props.getAccessoriesCollections();
    if (this.props.apparel.length < 1 ) this.props.getApparelCollections();
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
    // console.log('store index this.props: ', this.props)

    const loaderStyle = {
      backgroundImage: `url(${loaderImg})`,
      backgroundSize: 'cover',
      textAlign: 'center',
      height: '100vh',
      width: '100vw',
      position: 'relative'
    };

    const loaderFontStyle = {
      fontSize: '3rem',
      color: '#fff',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      textShadow: '2px 2px 2px #000'
    };

    const featuredProducts = () => {
      if (this.props.featuredAccessories.products.length > 1) {
        return (
          <div>
            <FeaturedProductRow
              featuredTitle="Elite Accessory Line"
              featuredProducts={this.props.featuredAccessories.products}
              featuredHandle="featured-accessories"
              collectionHandle="accessories"
              isMobile={this.state.isMobile}
            />
            <FeaturedProductRow
              classBackgroundColor="gray-bg"
              featuredTitle="Elite Apparel Line"
              featuredProducts={this.props.featuredApparel.products}
              featuredHandle="featured-apparel"
              collectionHandle="apparel"
              isMobile={this.state.isMobile}
            />
          </div>
        )
      } else {
        return <div style={loaderStyle}><h1 style={loaderFontStyle}>Loading Store Content</h1></div>
      }
    }
    
    const mainCollections = () => {
      if(this.props.accessories.length > 0 && this.props.apparel.length > 0) {
        return (
          <Fragment>
            <div className="store-help">
              <h3>WE ARE HERE TO HELP YOU</h3>
              <p>Call (877) 503-5483 to speak with an Elite Archery Expert to find the right gear for you. Available Mondays and Wednesdays 8AM - 5PM EST and 8AM EST - 5PM EST on Tuesdays, Thursdays, and Fridays.</p>
            </div>
            <section className="shop-more-wrapper">
              <h1>Shop more from elite</h1>
              <ShopMoreList
                title="Accessories"
                handle="accessories"
                products={this.props.accessories}
                isMobile={this.state.isMobile}
              />
              <ShopMoreList
                title="Apparel"
                handle="apparel"
                products={this.props.apparel}
                isMobile={this.state.isMobile}
              />
            </section>
          </Fragment>
        )
      } else {
        return null
      } 
    }

    return (
      <section className="store-layout">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Elite Archery - Top quality Sights, Releases, Arrows, Quivers, Rests and Hats, Shirts, Hoodies, Pullovers and more for the Target and Hunting Archer</title>
        </Helmet>

        {/* <HatBuilder /> */}
        <StoreMenu />
        {featuredProducts()}
        {mainCollections()}
      </section>
    );
  }
}

const mapStateToProps = ({ shopify }) => {
  return {
    accessories: shopify.collection.accessories,
    apparel: shopify.collection.apparel,
    featuredAccessories: shopify.collection.featuredAccessories,
    featuredApparel: shopify.collection.featuredApparel
  };
};

export default connect(mapStateToProps, {
  getApparelCollections: getApparelCollectionsAction,
  getAccessoriesCollections: getAccessoriesCollectionsAction,
  getFeaturedCollections: getFeaturedCollectionsAction
})(StoreIndex)
