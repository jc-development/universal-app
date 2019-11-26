import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './../assets/css/desktop-nav.css';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCaretDown } from '@fortawesome/fontawesome-free-solid';

export default class DesktopNav extends Component {

  constructor(props) {
    super(props);

    this.mainNav = null;
  }

  componentDidMount() {
    this.props.getMainNavHeight(this.mainNav.getBoundingClientRect().bottom);
  }

  componentWillUnmount() {
    this.mainNav = null;
  }

  render() {
    return (
      <nav id="desktop-nav" ref={mainNav => this.mainNav = mainNav}>
        <ul>
          <li><Link className="desktop-nav-logo" to="/"><img src="https://s3.amazonaws.com/elite-website/images/elite-logo-white-nav.png" alt="Elite Archery" /></Link></li>
          <li><Link to="/elite-bows/kure/overview">KURE BOW</Link></li>
          <li><Link to="/elite-bows">BOWS</Link></li>
          <li className="desktop-dropdown">
            <a href='' aria-haspopup='true' aria-expanded='false' onClick={this.props.handleDropdownStore} className={this.props.dropdownStoreVisible ? 'dropdown-open' : ''} >STORE <FontAwesomeIcon icon={faCaretDown} className="icon-nav" /></a>
            <div className={this.props.dropdownStoreVisible ? 'dropdown-wrapper open' : 'dropdown-wrapper'}>
              <div className="dropdown-inner">
                <div className="list">
                  <Link onClick={this.props.handleSubStoreMenuClick} to="/elite-bows"><h3>Bows</h3></Link>
                  <ul>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to={{ pathname: "/elite-bows/kure/buy", state:{bowIndex: 0}}}>KURE</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to={{ pathname: "/elite-bows/rezult/buy", state:{bowIndex: 0}}}>REZULT</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to={{ pathname: "/elite-bows/ritual/buy", state:{bowIndex: 3}}}>Ritual 35 Small Base</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to={{ pathname: "/elite-bows/valor/buy", state:{bowIndex: 0}}}>Valor</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to={{ pathname: "/elite-bows/ritual/buy", state:{bowIndex: 2}}}>Ritual 35</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to={{ pathname: "/elite-bows/ritual/buy", state:{bowIndex: 0}}}>Ritual 30</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to={{ pathname: "/elite-bows/ritual/buy", state:{bowIndex: 1}}}>Ritual 33</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to={{ pathname: "/elite-bows/revol/buy", state:{bowIndex: 0}}}>Revol XL</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to={{ pathname: "/elite-bows/victory/buy", state:{bowIndex: 0}}}>Victory X</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to={{ pathname: "/elite-bows/echelon/buy", state:{bowIndex: 0}}}>Echelon 37</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to={{ pathname: "/elite-bows/echelon/buy", state:{bowIndex: 1}}}>Echelon 39</Link></li>
                  </ul>
                </div>
                <div className="list">
                  <Link onClick={this.props.handleSubStoreMenuClick} to="/store/accessories"><h3>Accessories</h3></Link>
                  <ul>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to="/store/accessories/arrows">Arrows</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to="/store/accessories/bow-case">Bow Case</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to="/store/accessories/bow-strings">Bow Strings</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to="/store/accessories/draw-stop-assembly">Draw Stop Assembly</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to="/store/accessories/o-rings">O-Rings</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to="/store/accessories/quiver">Quiver</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to="/store/accessories/release">Release</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to="/store/accessories/rest">Rest</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to="/store/accessories/sling">Sling</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to="/store/accessories/small-gifts">Small Gifts</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to="/store/accessories/stabilizer">Stabilizer</Link></li>
                  </ul>
                </div>
                <div className="list">
                  <Link onClick={this.props.handleSubStoreMenuClick} to="/store/apparel"><h3>Apparel</h3></Link>
                  <ul>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to="/store/apparel/hats">Hats</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to="/store/apparel/knit-caps">Knit Caps</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to="/store/apparel/men-hoodies-jackets">Men Hoodies &amp; Jackets</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to="/store/apparel/men-polo-shirts">Men Polo Shirts</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to="/store/apparel/men-pullovers">Men Pullovers</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to="/store/apparel/men-t-shirts">Men T-Shirts</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to="/store/apparel/shooter-shirts">Shooter Shirts</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to="/store/apparel/women-hoodies-jackets">Women Hoodies &amp; Jackets</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to="/store/apparel/women-t-shirts">Women T-Shirts</Link></li>
                    <li><Link onClick={this.props.handleSubStoreMenuClick} to="/store/apparel/women-tank-top-shirts">Women Tank Top Shirts</Link></li>
                  </ul>
                </div>
                <div className="list">
                  <Link onClick={this.props.handleSubStoreMenuClick} to="/store"><h3>View All</h3></Link>
                </div>
              </div>
            </div>
          </li>
          <li><Link target="blank" to="https://news.elitearchery.com">NEWS</Link></li>
          <li><Link to="/dealer-locator">DEALER LOCATOR</Link></li>
          <li className="desktop-dropdown">
            <a href='' aria-haspopup='true' aria-expanded='false' onClick={this.props.handleDropdownSupport}>SUPPORT <FontAwesomeIcon icon={faCaretDown} className="icon-nav" /></a>
            <ul className={this.props.dropdownSupportVisible ? 'dropdown-menu open' : 'dropdown-menu'} ref={this.props.dropdownSupportMenu}>
              <li><Link to="/contact-us" onClick={this.props.handleSubSupportMenuClick}>Contact Us</Link></li>
              <li><Link target="blank" to="https://s3.amazonaws.com/elite-website/documents/catalog/elite-catalog.pdf" onClick={this.props.handleSubSupportMenuClick}>Catalog</Link></li>
              <li><Link to="/technical-manuals-spec-sheets" onClick={this.props.handleSubSupportMenuClick}>Tech Manuals &amp; Spec Sheets</Link></li>
              <li><Link to="/bow-press-compatibility" onClick={this.props.handleSubSupportMenuClick}>Bow Press Compatibility</Link></li>
              <li><Link to="/patents" onClick={this.props.handleSubSupportMenuClick}>Patents</Link></li>
              <li><Link to='/warranty-registration' onClick={this.props.handleSubSupportMenuClick}>Warranty Registration</Link></li>
            </ul>
          </li>
          <li className="cart"><Link className="cart-link-desktop" to="/cart"><FontAwesomeIcon icon={faShoppingCart} className="icon-nav" /><div className="cart-items-circle"><span className='cart-item-number'>{this.props.cartItemsCount}</span></div></Link></li>
        </ul>
      </nav>
    );
  }

}
