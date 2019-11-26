import React, { Component, Fragment } from 'react';
import axios from 'axios';

import './assets/css/assistance-form.css';

export default class AssistanceForm extends Component {

  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: '',
      email: '',
      phone: '',
      comment: '',
      nameErrorMsg: '',
      emailErrorMsg: '',
      phoneErrorMsg: ''
    }
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    })
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    })
  }

  handlePhoneChange(event) {
    this.setState({
      phone: event.target.value
    })
  }

  handleCommentChange(event) {
    this.setState({
      comment: event.target.value
    })
  }

  clearForm() {
    this.setState({
      name: '',
      email: '',
      phone: '',
      comment: ''
    }, () => {
      // need a store dispatch to reset the form state so it's closed.
      this.props.handleAssistanceFormClose(event);
    });
  }

  checkFormForErrors() {
    if (this.state.name === '' || this.state.name === ' ') {
      this.setState({
        nameErrorMsg: 'Please enter your first and last name'
      });
    } else {
      this.setState({
        nameErrorMsg: ''
      });
    }

    if (this.state.email === '' || this.state.email === ' ') {
      this.setState({
        emailErrorMsg: 'Please enter in your email address'
      });
    } else {
      this.setState({
        emailErrorMsg: ''
      });
    }

    if (this.state.phone === '' || this.state.phone === ' ') {
      this.setState({
        phoneErrorMsg: 'Please enter your phone number'
      });
    } else {
      this.setState({
        phoneErrorMsg: ''
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log('this.state: ', this.state);

    this.checkFormForErrors()
    // console.log('this.state AssistanceForm: ',  this.state);

    if (this.state.name === '' || this.state.email === '' || this.state.phone === '') {
      return;
    }

    const customer = {
      customerName: this.state.name,
      customerEmail: this.state.email,
      customerPhone: this.state.phone,
      customerComments: this.state.comment,
      bowModel: this.props.customerConfiguredBow.bowModel.name,
      // riserColorFamily: this.props.activeRiserColor.colorFamily,
      riserColor: this.props.customerConfiguredBow.riserColor.color.colorName,
      // limbColorFamily: this.props.activeLimbColor.colorFamily,
      limbColor: this.props.customerConfiguredBow.limbColor.color.colorName,
      drawLength: this.props.customerConfiguredBow.length,
      drawWeight: this.props.customerConfiguredBow.weight,
      handOrientation: this.props.customerConfiguredBow.hand
    };

    axios.post('/api/email-customer-service/', customer)
      .then( (response) => {
        console.log('response: ', response);
      })
      .catch( (err) => {
        console.log('error: ', err);
      });

    this.clearForm();

  }

  render() {
    console.log('this.props.customerConfiguredBow AssistanceForm: ', this.props.customerConfiguredBow);

    const formNode = () => {
      const upperCase = {
        textTransform: 'uppercase'
      };
      const configSummary = {
        border: '1px solid',
        padding: '1rem',
        margin: '3rem auto',
        textAlign: 'center',
        width: '85%'
      };

      const bowSku = () => {
        const customerConfiguredBow = this.props.customerConfiguredBow;
        const customerHandOrientation = `${customerConfiguredBow.hand === "right" ? 'rh' : 'lh'}`;

        const shopifyDynamicSKU = `${customerConfiguredBow.bowSku +                       /* model */
                                     customerConfiguredBow.weight +                         /* weight */
                                     customerConfiguredBow.riserColor +                     /* riser color */
                                     customerConfiguredBow.limbColor +                      /* limb color */
                                     customerConfiguredBow.length +                         /* draw length */
                                     customerHandOrientation +                              /* hand orientation */
                                     'st' +                                                 /* grip option */
                                     'st'                                                   /* string option */
                                   }`;

        return shopifyDynamicSKU.toLowerCase().replace(/\./g,'-');
      };

      const bowSkuInfo = () => {
        const { logo, modelYear, name } = this.props.customerConfiguredBow.bowModel;
        const { hand, length, limbColor, riserColor, weight } = this.props.customerConfiguredBow;

        return (
          <div>
            { logo ? <img style={ {height: "150px", width: "auto"} } src={ logo } /> : null }
            <dl className="config-summary-list">
              <dt>{ name }</dt>
              <dd><span>model year: </span>{ modelYear }</dd>
              <dd><span>riser color: </span>{ riserColor }</dd>
              <dd><span>limb color: </span>{ limbColor }</dd>
              <dd><span>draw length: </span>{ length }</dd>
              <dd><span>draw weight: </span>{ weight }</dd>
              <dd><span>hand orientation: </span>{ hand }</dd>
            </dl>
          </div>
        );
      };

      const determineMessaging = () => {
        if (this.props.customerConfiguredBow.riserColor === "mg") {
          return (
            <Fragment>
            <p>The GREEN MANTIS camo pattern is limited production. <span style={{fontWeight: "900"}}>Green Mantis is selling out fast and is currently only available in RIGHT HAND with a 70 LBS DRAW WEIGHT on the Ritual 30.</span></p>
            <p>Please select a RIGHT HAND orientation and a draw weight of 70 LBS in the builder to complete your configuration.</p>
            <p>Please use the form below to contact an Elite Customer Service Representive for any further assistance.</p>
            </Fragment>
          );
        } else if (this.props.customerConfiguredBow.riserColor === "wo") {
          return (
            <Fragment>
            <p>The WHITEOUT pattern is limited production. <span style={{fontWeight: "900"}}>Whiteout is selling out fast and is currently only available in RIGHT HAND with a 60 LBS DRAW WEIGHT on the Ritual 35.</span></p>
            <p>Please select a RIGHT HAND orientation and a draw weight of 60 LBS in the builder to complete your configuration.</p>
            <p>Please use the form below to contact an Elite Customer Service Representive for any further assistance.</p>
            </Fragment>
          );
        } else {
          return (
            <Fragment>
              <p>Our Service Representives will need to enter this bow configuration into our inventory system.</p>
              <p>Fill the form below so that an Elite Representive emails you when the bow is available to order.</p>
            </Fragment>
          );
        }
      }

      return (
        <div className="customer-assistance-form-wrapper">
          <form id="customer-assistance-form">
            <div>
              <h2>We Apologize for the interruption</h2>
              { determineMessaging() }
              <div style={configSummary}>
                <h3>Bow Configuration Summary</h3>
                { bowSkuInfo() }
              </div>
            </div>
            <div className="form-group">
              <div className={this.state.nameErrorMsg !== '' ? 'error' : null}>
                <label>First and Last Name *</label>
                <input type="text" className="form-input" placeholder="First and Last Name" onChange={this.handleNameChange} />
                {this.state.nameErrorMsg !== '' ? <p>{this.state.nameErrorMsg}</p> : null}
              </div>
            </div>
            <div className="form-group">
              <div className={this.state.emailErrorMsg !== '' ? 'error' : null}>
                <label>Email *</label>
                <input type="email" className="form-input" placeholder="Email Address" autocomplete='email' onChange={this.handleEmailChange} />
                {this.state.emailErrorMsg !== '' ? <p>{this.state.emailErrorMsg}</p> : null}
              </div>
            </div>
            <div className="form-group">
              <div className={this.state.phoneErrorMsg !== '' ? 'error' : null}>
                <label>Phone Number *</label>
                <input type="phone" className="form-input" placeholder="(555) 555-5555" autocomplete='tel' onChange={this.handlePhoneChange} />
                {this.state.phoneErrorMsg !== '' ? <p>{this.state.phoneErrorMsg}</p> : null}
              </div>
            </div>
            <div className="form-group">
              <label>Questions/Comments</label>
              <textarea className="form-input" rows="4" placeholder="Please add any questions or info that you'd like us to help you with." onChange={this.handleCommentChange} />
            </div>
            <button onClick={this.handleSubmit}>Send to Elite Customer Service</button>
            <button onClick={this.props.handleAssistanceFormClose}>Close</button>
          </form>
        </div>
      );
    };

    return formNode();
  }

}
