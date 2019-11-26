import React, { Component } from 'react';

import DesktopNav from './child-components/DesktopNav';
import { MobileNav } from './child-components/MobileNav';
import _debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import TweenMax from 'gsap/TweenMax';


class MainNavigation extends Component {

  constructor (props) {
   super (props)
    this.state = {
      cartItemsCount: 0,
      dropdownSupportVisible: false,
      dropdownMainVisible: false,
      navWidth: null,
      dropdownStoreVisible: false,
    };

    this.handleDropdownMain = this.handleDropdownMain.bind(this);
    this.handleDropdownSupport = this.handleDropdownSupport.bind(this);
    this.handleSubMenuClick = this.handleSubMenuClick.bind(this);
    this.handleSubSupportMenuClick = this.handleSubSupportMenuClick.bind(this)
    this.handleNavWidth = _debounce(this.handleNavWidth.bind(this), 150);

    this.handleGetMainNavHeight = this.handleGetMainNavHeight.bind(this);

    this.handleDropdownStore = this.handleDropdownStore.bind(this);
    this.handleSubStoreMenuClick = this.handleSubStoreMenuClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.cart !== null && nextProps.cart !== null) {
      if (this.props.cart.lineItems !== nextProps.cart.lineItems) {

        if (nextProps.cart.lineItems.length > 0) {

          this.setState({
            cartItemsCount: nextProps.cart.lineItems.length
          });

          TweenMax.set('.cart-items-circle', {display: 'block',
            css: {
              padding: '0px',
              height: '25px',
              width: '25px',
              lineHeight: '0',
              textAlign: 'center',
              position: 'absolute',
              top: '-40px',
              left: '10px',
              backgroundColor: '#337ab7',
              borderRadius: '50%',
              zIndex: 1
            }
          });

          TweenMax.to('.cart-items-circle', 0, {autoAlpha: 1})
          TweenMax.to('.cart-item-number', 0.5, {autoAlpha: 1})
        } else {
          TweenMax.to('.cart-item-number', 0.5, {autoAlpha: 0})
          TweenMax.to('.cart-items-circle', 0.5, {autoAlpha: 0})
        }
      }
    } else if (nextProps.cart === null) {
      // something happened to cart - create a new instance for redux
      this.setState({
        cartItemsCount: 0
      });
    }
  }

  componentDidMount() {
    this.handleNavWidth()
    window.addEventListener('resize', this.handleNavWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleNavWidth)
  }

  handleNavWidth() {
    this.setState({navWidth: this.mainNav.clientWidth})
  }

  handleDropdownMain(event) {
    event.preventDefault();

    this.setState({
      dropdownMainVisible: !this.state.dropdownMainVisible
    });
  }

  handleSubMenuClick() {
    this.setState({
      dropdownMainVisible: !this.state.dropdownMainVisible
    });
  }

  handleSupportMenuClick() {
    this.setState({
      supportMenuVisible: !this.state.supportMenuVisible
    })
  }

  handleDropdownSupport(event) {
    event.preventDefault();
    if(this.state.dropdownStoreVisible) {
      this.setState({
        dropdownStoreVisible: !this.state.dropdownStoreVisible,
        dropdownSupportVisible: !this.state.dropdownSupportVisible
      });
    } else {
      this.setState({
        dropdownSupportVisible: !this.state.dropdownSupportVisible
      });
    }
  }

  handleSubSupportMenuClick() {
    this.setState({
      dropdownSupportVisible: !this.state.dropdownSupportVisible
    });
  }

  handleGetMainNavHeight(height) {
    // console.log('height: ', height);
    // this.props.obtainMainNavHeightFromDomEl(height);
  }

  handleDropdownStore(event) {
    event.preventDefault();

    if(this.state.dropdownSupportVisible) {
      this.setState({
        dropdownSupportVisible: !this.state.dropdownSupportVisible,
        dropdownStoreVisible: !this.state.dropdownStoreVisible
      });
    } else {
      this.setState({
        dropdownStoreVisible: !this.state.dropdownStoreVisible
      });
    }

  }

  handleSubStoreMenuClick() {
    this.setState({
      dropdownStoreVisible: !this.state.dropdownStoreVisible
    });
  }

  render() {
    // console.log('main nav re-render');
    return (
      <header id="main-nav" ref={(mainNav) => { this.mainNav = mainNav }}>
      { this.state.navWidth !== null ?
         this.state.navWidth > 900 ?
          <DesktopNav
            cartItemsCount={this.state.cartItemsCount}
            handleDropdownSupport={this.handleDropdownSupport}
            dropdownSupportVisible={this.state.dropdownSupportVisible}
            handleSubSupportMenuClick={this.handleSubSupportMenuClick}
            getMainNavHeight={this.handleGetMainNavHeight}
            handleDropdownStore={this.handleDropdownStore}
            dropdownStoreVisible={this.state.dropdownStoreVisible}
            handleSubStoreMenuClick={this.handleSubStoreMenuClick}
          />
          :
          <MobileNav
            dropMenuVisible={this.state.dropdownMainVisible}
            cartItemsCount={this.state.cartItemsCount}
            handleDropdownMain={this.handleDropdownMain}
            handleDropdownSupport={this.handleDropdownSupport}
            handleSubMenuClick={this.handleSubMenuClick}
            dropdownSupportVisible={this.state.dropdownSupportVisible}
          />
        : null
      }
      </header>
    );
  }
}

const mapStateToProps = ({ shopify }) => {
  return {
    cart: shopify.cart
  }
};

export default connect(mapStateToProps)(MainNavigation);

// obtainMainNavHeightFromDomEl: obtainMainNavHeightFromDomElAction,
