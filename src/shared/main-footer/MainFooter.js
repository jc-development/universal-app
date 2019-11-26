import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchBowModel as fetchBowModelAction } from './../bows/bow-model/actions';

import './assets/css/main-footer.css';
import camxLogo from './assets/images/camx-logo.png';
import cbeLogo from './assets/images/cbe-logo.png';
import duelLogo from './assets/images/duel-logo.png';
import lmcLogo from './assets/images/lmc-logo.png';
import scottLogo from './assets/images/scott-logo.png';
import slickTrickLogo from './assets/images/slick-trick-logo.png';
import solidLogo from './assets/images/solid-logo.png';
import wcLogo from './assets/images/wc-logo.png';
import rtgLogo from './assets/images/rtg-logo.png';

class MainFooter extends Component {

  constructor(props) {
    super(props);

    this.handleBowClick = this.handleBowClick.bind(this);
  }

  handleBowClick(bowName) {
    this.props.fetchBowModel(bowName);
  }

  render() {
    return (
      <footer id="main-footer">
          <div className="website-links-wrapper">
              <dl>
                <dt>SHOP</dt>
                <dd><Link to="/elite-bows">Order Your Bow</Link></dd>
                <dd><Link to="/store/accessories">Accessories Store</Link></dd>
                <dd><Link to="/store/apparel">Apparel Store</Link></dd>
                <dd><Link to="/dealer-locator">Dealer Locator</Link></dd>
              </dl>
              <dl>
                <dt>OWNERSHIP</dt>
                <dd><Link to="/warranty-registration">Warranty Registration</Link></dd>
                <dd><Link to="/elite-hunt-guarantee">Elite Hunt Guarantee</Link></dd>
                <dd><Link to="/elite-archery-financing">Elite Archery Financing</Link></dd>
              </dl>
              <dl>
                <dt>SUPPORT</dt>
                <dd><Link to="/contact-us">Contact Us</Link></dd>
                <dd><Link target="blank" to="https://s3.amazonaws.com/elite-website/documents/catalog/elite-catalog.pdf">Catalog</Link></dd>
                <dd><Link to="/technical-manuals-spec-sheets">Tech Manuals &amp; Spec Sheets</Link></dd>
                <dd><Link to="/bow-press-compatibility">Bow Press Compatibility</Link></dd>
                <dd><Link to="/patents">Patents</Link></dd>
                <dd><Link to="/privacy-policy">Privacy Policy</Link></dd>
              </dl>
              <dl>
                <dt>DEALER SUPPORT</dt>
                <dd><a target='_blank' href="https://info.elitearchery.com/become-an-elite-dealer">Become A Dealer</a></dd>
                <dd><a target='_blank' href='https://s3.amazonaws.com/togllc.com/2017-TOG-MAP-Policy.pdf'>Map Policy</a></dd>
                <dd><a target='_blank' href='http://media.togllc.com/'>Media</a></dd>
              </dl>
              <dl>
                <dt>COMMUNITY</dt>
                <dd><Link to="/partners">Partners</Link></dd>
                <dd><Link to="/contingency-program"><i className="fa fa-bullseye" aria-hidden="true"></i> Contingency</Link></dd>
                <dd><a target='_blank' href='https://www.facebook.com/EliteArchery'><i className="fa fa-facebook" aria-hidden="true"></i> Facebook</a></dd>
                <dd><a target='_blank' href='https://twitter.com/Elite_Archery'><i className="fa fa-twitter" aria-hidden="true"></i> Twitter</a></dd>
                <dd><a target='_blank' href='https://instagram.com/elitearchery/'><i className="fa fa-instagram" aria-hidden="true"></i> Instagram</a></dd>
              </dl>
          </div>
          <div className="partners-links-wrapper">
              <ul>
                <li><a target='_blank' href='https://www.winnerschoicestrings.com'><img src={wcLogo} alt="Winners Choice Strings logo"/></a></li>
                <li><a target='_blank' href='https://www.solid-broadheads.com'><img src={solidLogo}  alt="Solid Broadheads logo"/></a></li>
                <li><a target='_blank' href='https://duelgamecalls.com'><img src={duelLogo} alt="Duel Game Calls logo"/></a></li>
                <li><a target='_blank' href='https://slicktrick.net'><img src={slickTrickLogo} alt="Slick Trick Broadheads"/></a></li>
                <li><a target='_blank' href='http://www.respectthegame.tv'><img src={rtgLogo}  alt="Respect The Game TV logo"/></a></li>
                <li><a target='_blank' href='https://custombowequipment.com'><img src={cbeLogo} alt="Custom Bow Equipment logo"/></a></li>
                <li><a target='_blank' href='https://scottarchery.com'><img src={scottLogo} className="tall-icon" alt="Scott Archery logo"/></a></li>
                <li><a target='_blank' href='https://camxcrossbows.com'><img src={camxLogo} alt="CamX Crossbows logo"/></a></li>
                <li><a target='_blank' href='https://lynchmobcalls.com'><img src={lmcLogo} className="tall-icon" alt="Lynch Mob Calls logo"/></a></li>
              </ul>
          </div>
        <div className="copyright">
          <p>ELITE ARCHERY 2009 - 2019 ALL RIGHTS RESERVED</p>
          <img src="https://s3.amazonaws.com/elite-website/images/elite-logo-white-nav.png"  alt="Elite Archery Logo" />
        </div>
      </footer>
    )
  }
}

const mapStateToProps = ({ bowModel }) => ({
  bowModel
});

export default connect( mapStateToProps, {
  fetchBowModel: fetchBowModelAction
} )(MainFooter);
