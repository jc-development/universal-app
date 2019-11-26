import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './assets/css/error-404.css';

export default class Error404 extends Component {
  render() {
    return (
      <section id="error-404" className="width-85">
          <div className='center-content'>
            <h4>Even though Elite Archery makes the World's Most Shootable Bows, we can't seem to find the page you're looking for.</h4>
          </div>
          <h5>Here are some helpful links:</h5>
          <div className="links-wrapper">
            <dl>
              <dt>Popular:</dt>
              <dd><Link to="/">Home</Link></dd>
              <dd><Link to="/elite-bows">Order Your Bow</Link></dd>
              <dd><Link to="/store">Store</Link></dd>
              <dd><Link to="/store/accessories">Elite Accessories</Link></dd>
              <dd><Link to="/store/apparel">Elite Apparel</Link></dd>
              <dd><Link to="/contact-us">Contact Us</Link></dd>
              <dd><Link to="/warranty-registration">Warranty Registration</Link></dd>
              <br></br>
              <dt>Dealers:</dt>
              <dd><Link to="/dealer-locator">Find A Dealer</Link></dd>
              <dd><a target='_blank' href="https://info.elitearchery.com/become-an-elite-dealer">Become A Dealer</a></dd>
            </dl>
            <dl>
              <dt>All Bows:</dt>
              <dd><Link to="/elite-bows/kure/overview">KURE</Link></dd>
              <dd><Link to="/elite-bows/rezult/overview">REZULT</Link></dd>
              <dd><Link to="/elite-bows/valor/overview">Valor</Link></dd>
              <dd><Link to="/elite-bows/ritual/overview">Ritual 35</Link></dd>
              <dd><Link to="/elite-bows/ritual/overview">Ritual 30</Link></dd>
              <dd><Link to="/elite-bows/ritual/overview">Ritual 33</Link></dd>
              <dd><Link to="/elite-bows/victory/overview">Victory X</Link></dd>
              <dd><Link to="/elite-bows/echelon/overview">Echelon 37</Link></dd>
              <dd><Link to="/elite-bows/echelon/overview">Echelon 39</Link></dd>
              <dd><Link to="/elite-bows/revol/overview">Revol XL</Link></dd>
            </dl>
            <div>
              <a href='https://s3.amazonaws.com/elite-website/documents/tech-manuals/2020_techmanual.pdf' target='_blank'>
                <img className='tech-image' src='https://s3.amazonaws.com/elite-website/images/tech-manual-cover/Tech-Manual-2020.jpg' alt='Elite Archery - Technical Manual 2020' />
              </a>
            </div>
          </div>
      </section>
    );
  }
}
