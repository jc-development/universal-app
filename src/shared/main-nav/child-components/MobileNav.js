import React from 'react';
import { Link } from 'react-router-dom';

import './../assets/css/mobile-nav.css';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBars, faNewspaper, faMapMarkerAlt, faCog, faShoppingCart, faTimes } from '@fortawesome/fontawesome-free-solid'

export const MobileNav = (props) => {

  return (
    <nav id="mobile-nav">
      <ul>
        <li className="logo"><Link to="/"><img src="https://s3.amazonaws.com/elite-website/images/elite-logo-white-nav.png" className="logo-size" alt="Elite Archery" /></Link></li>
        <li className="cart"><Link className="cart-link-mobile" to="/cart"><FontAwesomeIcon icon={faShoppingCart} size="2x" /><div className="cart-items-circle"><span className='cart-item-number'>{props.cartItemsCount}</span></div></Link></li>
        <li className="main-menu"><a href='' className='main-menu-toggle' aria-haspopup='true' aria-expanded='false' onClick={props.handleDropdownMain}>{props.dropMenuVisible ?  <FontAwesomeIcon icon={faTimes} size="2x" /> : <FontAwesomeIcon icon={faBars} size="2x" /> }</a></li>
      </ul>
      <ul className={props.dropMenuVisible ? "dropdown-main-menu open" : "dropdown-main-menu"}>
        <li><Link to="/elite-bows/kure/design" onClick={props.handleSubMenuClick}>KURE BOW</Link></li>
        <li><Link to="/elite-bows/ritual/overview" onClick={props.handleSubMenuClick}>RITUAL BOW SERIES</Link></li>
        <li><Link to="/elite-bows" onClick={props.handleSubMenuClick}>BOWS</Link></li>
        <li><Link to="/store" onClick={props.handleSubMenuClick}>STORE</Link></li>
        <li><Link target="blank" to="https://news.elitearchery.com" onClick={props.handleSubMenuClick}><FontAwesomeIcon icon={faNewspaper} className="icon-nav" />NEWS</Link></li>
        <li><Link to="/dealer-locator" onClick={props.handleSubMenuClick}><FontAwesomeIcon icon={faMapMarkerAlt} className="icon-nav" />DEALER LOCATOR</Link></li>
        <li><a href='' className='dropdown-toggle' aria-haspopup='true' aria-expanded='false' onClick={props.handleDropdownSupport}><FontAwesomeIcon icon={faCog} className="icon-nav" />SUPPORT</a></li>
        <li className={props.dropdownSupportVisible ? 'dropdown-menu open' : 'dropdown-menu'} ref={props.handleSubSupportMenuClick}>
          <ul>
            <li><Link role="buton" to="/contact-us" onClick={props.handleSubMenuClick}>Contact Us</Link></li>
            <li><Link role="buton" target="blank" to="https://s3.amazonaws.com/elite-website/documents/catalog/elite-catalog.pdf" onClick={props.handleSubMenuClick}>Catalog</Link></li>
            <li><Link role="buton" to="/technical-manuals-spec-sheets" onClick={props.handleSubMenuClick}>Tech Manuals &amp; Spec Sheets</Link></li>
            <li><Link role="buton" to="/bow-press-compatibility" onClick={props.handleSubMenuClick}>Bow Press Compatibility</Link></li>
            <li><Link role="buton" to="/patents" onClick={props.handleSubMenuClick}>Patents</Link></li>
            <li><Link role="buton" to="/warranty-registration" onClick={props.handleSubMenuClick}>Warranty Registration</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
