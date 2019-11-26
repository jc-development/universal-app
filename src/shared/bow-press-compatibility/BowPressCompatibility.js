import React, { Component } from 'react';

import './assets/css/bow-press-compatibility.css';

export default class BowPressCompatibility extends Component {

  render () {
    return (
      <section id="bow-press-compatibility" className="width-85">
          <div className='center-content'>
            <h1 >Bow Press Compatibility</h1>
            <div className='bow-presses-wrapper'>
              <div className='bow-press-wrapper'>
                <h3 className="bow-press-title">Fixed Bow Press</h3>
                <ul className='bow-press-list'>
                  <li>Apple Archery Eliminator</li>
                  <li>Big Squeeze</li>
                  <li>Bow-A-Constrictor</li>
                  <li>ELP</li>
                  <li>EZ Press</li>
                  <li>HTP</li>
                  <li>Pac-Press</li>
                  <li>Spikepress</li>
                  <li>Sure-Lok</li>
                </ul>
              </div>
              <div className='bow-press-wrapper'>
                <h3 className="bow-press-title">Portable Bow Press</h3>
                <ul className='bow-press-list'>
                  <li>Bowmaster</li>
                  <li>Pac-Press</li>
                </ul>
              </div>
            </div>
          </div>
      </section>
    )
  }
}
