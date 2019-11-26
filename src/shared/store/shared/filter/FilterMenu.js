import React, { Component } from 'react';

import './assets/css/filter.css';
import eliteLogoSrc from './../assets/images/elite-logo-black.png';

/*
  Get the collection group names. Will be dynamic, so needs to communicate with backend.
  Might be able to get props and be functional
*/

export default class FilterMenu extends Component {

  render() {
    return (
      <div className="filter-menu">
        <header>
          <img src={eliteLogoSrc} />
          <h4>Accessories</h4>
        </header>
        <nav>
          <dl>
            <dt>on the bow</dt>
            <dd>sights</dd>
            <dd>slings</dd>
            <dd>stabilizers</dd>
            <dd>quivers</dd>
            <dd>rests</dd>
            <dd>arrows</dd>
          </dl>
          <dl>
            <dt>Comfort</dt>
            <dd>release</dd>
          </dl>
          <dl>
            <dt>travel</dt>
            <dd>bow cases</dd>
            <dd>release pouch</dd>
          </dl>
          <dl>
            <dt>maintenance</dt>
            <dd>Draw stop kit</dd>
            <dd>o-ring kit</dd>
            <dd>strings &amp; cables</dd>
          </dl>
        </nav>
        <p>Reset Filter</p>
      </div>
    );
  }

}
