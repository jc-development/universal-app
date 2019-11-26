import React, { Component } from 'react';

import './assets/css/contingency-program.css';

export default class ContingencyProgram extends Component {
  render () {
    return (
      <section id='contingency-program' className="width-85">
        <div className='center-content'>
            <h1>Contingency Program</h1>
            <div className="rules-container">
              <h3 className='rules-title'>Rules &amp; Regulations</h3>
              <ul className="rules-list">
               <li>It is the responsibility of the winner to contact Elite Archery to collect his or her contingency money.<br/>Please send an email to our contingency team: <a href="mailto:contingency@togllc.com">contingency@togllc.com</a>.</li>
               <li>Proof of winning must be provided. A photo of the winner with his or her Elite bow in hand and the award must be emailed or mailed to Elite Archery.</li>
               <li>Elite Archery Staff will verify the winner through each organization before payout will be made.</li>
  				     <li><strong>The IRS requires all winners to fill out a W-9 form before payment can be made.</strong><br/><strong>The W-9 form must be filled out only once per season.</strong><br/> Please <a href="https://s3.amazonaws.com/elite-website/documents/IRS+forms/w9.pdf" target="_blank">click here to download</a>, fill out, and attach this form to your email to our contingency staff.</li>
  				     <li><strong>The IRS requires all Canadian citizens that win contingency to fill out a W-8 form once per season before any payment can be made.</strong><br />Please <a href="https://s3.amazonaws.com/elite-website/documents/IRS+forms/w8.pdf" target="_blank">click here to download</a>, fill out, and attach this form to your email to our contingency staff.</li>
               <li>All decisions on contingency program payouts will be made by Elite Archery and are final.</li>
              </ul>
            </div>
            <div className='contingency-download'>
              <a href="https://s3.amazonaws.com/elite-website/documents/contingency-program/2019-elite-archery-contingency-program.pdf" target="_blank">
                <h5>Click here to download a complete 2019 Elite contingency schedule</h5>
                <img src="https://s3.amazonaws.com/elite-website/images/2019-elite-contingency.jpg" alt="Elite Archery Contingency Program Image Overview"/>
              </a>
            </div>
          </div>
      </section>
    )
  }
}
