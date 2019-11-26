import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { CategoryProduct } from './child-components/CategoryProduct';
import TagFiltering from './child-components/TagFiltering';

import { Helmet } from 'react-helmet';
import MonthlyPayment from './../../klarna/MonthlyPayment';

import { connect } from 'react-redux';

import {
  getCollectionByHandle as getCollectionByHandleAction,
  clearCollection as clearCollectionAction,
} from '../../reusable/shopify/collection/actions';

import './assets/css/store-collection-category.css';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTruck } from '@fortawesome/fontawesome-free-solid'
import _flatMap from 'lodash/flatMap';

import StoreMenu from './../store-index/child-components/StoreMenu';

class StoreCollectionCategory extends Component {

  componentWillMount() {
    // let collectionProductType = this.props.match.params.collection; //  accessories or apparel
    let collectionHandle = this.props.match.params.category; // collection name
    this.props.getCollectionByHandle(collectionHandle);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.collection.title === "") {
      this.props.history.replace('/store')
    } else if (nextProps.collection.products.length === 1) {
      this.props.history.replace(nextProps.location.pathname + "/" + nextProps.collection.products[0].handle)
    } else if (this.props.match.params.category !== nextProps.match.params.category) {
      this.props.getCollectionByHandle(nextProps.match.params.category);
    }
  }

  componentWillUnmount() {
    this.props.clearCollection();
  }

  render() {
    // console.log('this.props: ', this.props)
      return (
        <section id="store-collection-category">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Elite Archery Store - {this.props.match.params.collection + ' - ' + this.props.match.params.category}</title>
          </Helmet>
          <StoreMenu />
          <h3 className="free-shipping"><FontAwesomeIcon icon={faTruck} /> free shipping!</h3>
          <ol className="breadcrumbs">
            <li><Link to="/">home</Link></li>
            <li><Link to="/store">store</Link></li>
            <li><Link to={"/store/" + this.props.match.params.collection}>{this.props.match.params.collection}</Link></li>
            <li className="active">{this.props.match.params.category}</li>
          </ol>
          <article className="store-collection-category-content">
            <h1 className="store-collection-category-title">{this.props.collection.title}</h1>
            {this.props.collection.description !== "" ? <p>{this.props.collection.description}</p> : null}
            {this.props.collection.title !== "" ? 
              this.props.collection.products.length > 0 ?
                <div className="store-collection-category-products-wrapper">
                  <TagFiltering
                    products={this.props.collection.products}
                  />
                  <CategoryProduct
                    product={this.props.collection.filteredProducts !== null ? this.props.collection.filteredProducts : this.props.collection.products}
                    path={this.props.location.pathname}
                    category={this.props.match.params.category}
                  />
                </div>
              :
                <div style={{marginTop: "2rem",padding: "1rem"}}>
                  <h3 style={{color: "red"}}>Temporarily Sold Out</h3>
                  <p style={{fontSize: "1.5rem"}}>Please Check Back Soon</p>
                </div>
            :
              <h1>Loading</h1>
            }
            

          </article>
        </section>
      );
  }
}

const mapStateToProps = ({ shopify }) => {
  return {
    collection: shopify.collection.selected,
  };
};

export default connect(mapStateToProps, {
  getCollectionByHandle: getCollectionByHandleAction,
  clearCollection: clearCollectionAction,
})(StoreCollectionCategory)
