import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './assets/css/elite-klarna-financing.css';

export default class EliteKlarnaFinancing extends Component {

  render() {

    return (
      <section id="elite-klarna-financing">
        <article className="hero-wrapper">
          <img className="hero-img" src="https://s3.amazonaws.com/elite-website/v2/images/impulse-home.jpg" alt="Elite is offering pay as you go financing." />
          <div className="hero-content">
            <h1>Financing Is Now Available</h1>
            <p>PAY AS YOU GO</p>
          </div>
        </article>

        <article className="pay-plan-wrapper">
          <header className="center-content width-85">
            <h3>The Elite PAY AS YOU GO PLAN</h3>
            <h4>Elite is proud to introduce a program designed to make owning an Elite Bow as <em>SIMPLE AS POSSIBLE</em></h4>
          </header>
            <div className="pay-plan center-content width-85">
              <div>
                <img src="https://s3.amazonaws.com/elite-website/v2/images/klarna/clock.png" alt="FAST CREDIT CHECK TIME" />
                <p>Complete a 15-second credit check and get an <em>immediate response</em>.</p>
              </div>
              <div>
                <img src="https://s3.amazonaws.com/elite-website/v2/images/klarna/nohiddenfee.png" alt="No hidden fees" />
                <p>NO HIDDEN FEES. NO SUPRISES.</p>
              </div>
            </div>
        </article>

        <Link className="elite-finance-cta" to="/elite-bows"><img src="https://s3.amazonaws.com/elite-website/v2/images/elite-logo-black.png" alt="Elite Archery logo"/><h1>VIEW THE ELITE BOW LINEUP</h1></Link>
        <article>
        <h3>What is Klarna Credit?</h3>
        <p>Klarna Credit is a way to finance your bow over time. It is like a traditional credit card without the card. No need to enter in any card numbers in the online checkout form.</p>
        <p>Klarna Credit may also offer promotional financing options for you at checkout.</p>
        </article>

        <article className="credit-apply">
          <h3>How do I apply for Klarna Credit?</h3>
          <p>When you shop at Elite, you will have the option of applying for Klarna credit at checkout.</p>
          <img src="https://s3.amazonaws.com/elite-website/v2/images/klarna/checkout.jpg" alt="apply for credit at checkout" />
        </article>

        <article>
          <h3>Does Klarna do a credit check?</h3>
          <p>If you choose to apply for Klarna credit, Klarna performs a complete credit check. This includes contacting credit bureaus and evaluating your credit worthiness. </p>
        </article>

        <article>
          <h3>Where Can I Get More Information About Klarna Credit?</h3>
          <p>More information can be found on the Klarna [<a href="https://www.klarna.com/us/customer-service/slice-it/" target="_blank">FAQs</a>]. Financing with Klarna is subject to credit approval and issued by WebBank, member FDIC. Complete terms are available [<a href="https://cdn.klarna.com/1.0/shared/content/legal/terms/0/en_us/account-terms" target="_blank">here</a>], and when you apply.</p>
        </article>

        <article>
          <h3>What percentage rate will I pay?</h3>
          <p>For specific rates about Klarna's credit offerings, please contact Klarna at <a href="tel:1-844-552-7621">1-844-552-7621</a>.</p>
        </article>

        <article>
          <h3>How does paying over time work?</h3>
          <p>By choosing Klarna as your payment option, you will see your fixed payment option(s). Each month you will receive a statement with your fixed payment amount(s) due. You can view and manage your account online at <a href="https://www.klarna.com">https://www.klarna.com</a>.</p>
        </article>

        <article>
          <h3>Can I pay my balance due in full or do I have to continue to pay the balance over time?</h3>
          <p>You can always pay your full amount at any time.</p>
        </article>

      </section>
    );
  }
}
