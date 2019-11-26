import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import './assets/css/contact-us.css';

export default class ContactUs extends Component {


render () {
  return (
      <section id="contact-us" className="width-85">
        <Helmet>
          <title>Contact Elite Archery: Ready and willing to answer questions for those looking to be a new member of the Elite Archery community.</title>
        </Helmet>
        <article className='center-content'>
          <header className=''>
            <h1>Contact Elite Archery</h1>
            <p>We are always looking for feedback from our clients and remain ready and willing to answer questions for those looking to be a new member of the Elite Archery community! Please use this email address: <a href="mailto:techsupport.north@togllc.com">techsupport.north@togllc.com</a>  to help us route your request to the correct resource and we'll get back in touch with you as quickly as we can.</p>
          </header>
          <h3>Additional Information</h3>
          <address>
            <dl>
              <dt>Elite Archery</dt>
              <dd>1325 John St. <br /> West Henrietta, NY 14586</dd>
            </dl>
          </address>
          <dl>
            <dt>Customer Service:</dt>
            <dd>Monday-Friday 8AM - 5PM EST</dd>
          </dl>
          <dl className="phone-number">
            <dt>Toll Free:</dt>
            <dd><a href='tel:8775035483'>(877) 503-5483</a></dd>
          </dl>
          <dl className="phone-number">
            <dt>Phone:</dt>
            <dd><a href='tel:5854440204'>(585) 444-0204</a></dd>
          </dl>
          <dl className="phone-number">
            <dt>Fax:</dt>
            <dd><a href='tel:5854440209'>(585) 444-0209</a></dd>
          </dl>
        </article>
      </section>
    );
  }
}
