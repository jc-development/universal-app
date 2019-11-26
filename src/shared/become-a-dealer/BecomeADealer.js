import React, { Component } from 'react';
import axios from 'axios';

import './assets/css/become-a-dealer.css';

export default class BecomeADealer extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
    this.handleStreetAddressChange = this.handleStreetAddressChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);

    this.state = {
      firstNameError: '',
      lastNameError: '',
      emailError: '',
      phoneError: '',
      subjectError: '',
      companyNameError: '',
      streetAddressError: '',
      cityError: '',
      stateError: '',
      zipError: '',
      countryError: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      companyName: '',
      streetAddress: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    }
  }

  handleFirstNameChange(event) {
    this.setState({
      firstName: event.target.value
    });
  }

  handleLastNameChange(event) {
    this.setState({
      lastName: event.target.value
    });
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handlePhoneChange(event) {
    this.setState({
      phone: event.target.value
    });
  }

  handleCompanyNameChange(event) {
    this.setState({
      companyName: event.target.value
    });
  }

  handleStreetAddressChange(event) {
    this.setState({
      streetAddress: event.target.value
    });
  }

  handleCityChange(event) {
    this.setState({
      city: event.target.value
    });
  }

  handleStateChange(event) {
    this.setState({
      state: event.target.value
    });
  }

  handleZipChange(event) {
    this.setState({
      zip: event.target.value
    });
  }

  handleCountryChange(event) {
    this.setState({
      country: event.target.value
    });
  }

  resetEmailForm () {
    this.setState({
      firstNameError: '',
      lastNameError: '',
      emailError: '',
      phoneError: '',
      subjectError: '',
      messageError: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }, function () { return this.state })

    const signupForm = document.querySelector('#dealer-signup-form form');
    // const signupFormInputElements = signupForm.querySelectorAll('.form-control')
    // for (var i = 0; i < signupFormInputElements.length; i++) {
    //   signupFormInputElements[i].value = ''
    // }
  }

  handleSubmit(event) {
    event.preventDefault();

    const dealer = {
      brand: 'Elite Archery',
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      companyName: this.state.companyName,
      streetAddress: this.state.streetAddress,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      country: this.state.country
    }

    if (this.state.firstName === '') {
      this.setState({
        firstNameError: 'Please enter your first name'
      });
    } else {
      this.setState({
        firstNameError: ''
      });
    }

    if (this.state.lastName === '') {
      this.setState({
        lastNameError: 'Please enter your last name'
      });
    } else {
      this.setState({
        lastNameError: ''
      });
    }

    if (this.state.email === '') {
      this.setState({
        emailError: 'Please enter your email address'
      });
    } else {
      this.setState({
        emailError: ''
      });
    }


    if (this.state.phone === '') {
      this.setState({
        phoneError: 'Please enter your phone number'
      });
    } else {
      this.setState({
        phoneError: ''
      });
    }

    if (this.state.companyName === '') {
      this.setState({
        companyNameError: 'Please enter your company name'
      });
    } else {
      this.setState({
        companyNameError: ''
      });
    }

    if (this.state.streetAddress === '') {
      this.setState({
        streetAddressError: 'Please enter your street address'
      });
    } else {
      this.setState({
        streetAddressError: ''
      });
    }

    if (this.state.city === '') {
      this.setState({
        cityError: 'Please enter your city name'
      });
    } else {
      this.setState({
        cityError: ''
      });
    }

    if (this.state.state === '') {
      this.setState({
        stateError: 'Please enter your state/province name'
      });
    } else {
      this.setState({
        stateError: ''
      });
    }

    if (this.state.zip === '') {
      this.setState({
        zipError: 'Please enter your zip/postal code'
      });
    } else {
      this.setState({
        zipError: ''
      });
    }

    if (this.state.country === '') {
      this.setState({
        countryError: 'Please enter your country name'
      });
    } else {
      this.setState({
        countryError: ''
      });
    }


    if (this.state.firstName !== '' &&
        this.state.lastName !== '' &&
        this.state.email !== '' &&
        this.state.phone !== '' &&
        this.state.companyName !== '' &&
        this.state.streetAddress !== '' &&
        this.state.city !== '' &&
        this.state.state !== '' &&
        this.state.zip !== '' &&
        this.state.country !== ''
      ) {
        // // console.log('dealer: ', dealer);
        axios.post('/api/post-interested-dealer', dealer).catch((error) => {console.log(error)});
        this.resetEmailForm();
      }

  }

  render() {
    return(
      <section id="become-a-dealer" className="width-85">
          <div className='center-content'>
            <h1>Interested in becoming an Elite Archery Dealer?</h1>
            <p>Please use the form to apply for membership into one of archery's most established brands currently experiencing explosive growth.</p>
            <p>* indicates required field</p>
          </div>
        <form>

           <fieldset className="form-group">
             <div className={this.state.firstNameError !== '' ? 'error' : ''}>
              <label htmlFor="firstName">First Name *</label>
              <input onChange={this.handleFirstNameChange} className="form-input" type="text" placeholder="First Name" autoComplete='given-name' />
              {this.state.firstNameError !== '' ? <div className="form-error-msg">{this.state.firstNameError}</div> : null}
            </div>
          </fieldset>

           <fieldset className="form-group">
             <div className={this.state.lastNameError !== '' ? 'error' : ''}>
            <label htmlFor="lastName">Last Name *</label>
            <input onChange={this.handleLastNameChange} className="form-input" type="text" placeholder="Last Name" autoComplete='family-name' />
            </div>
            </fieldset>

           <fieldset className="form-group">
             <div className={this.state.emailError !== '' ? 'error' : ''}>
            <label htmlFor="email">Email *</label>
            <input onChange={this.handleEmailChange} className="form-input" type="email" placeholder="Email" autoComplete='email' />
            {this.state.lastNameError !== '' ? <div className="form-error-msg">{this.state.lastNameError}</div> : null}
            </div>
            </fieldset>

           <fieldset className="form-group">
             <div className={this.state.phoneError !== '' ? 'error' : ''}>
            <label htmlFor="phone">Phone *</label>
            <input onChange={this.handlePhoneChange} className="form-input" type="phone" placeholder="Phone" autoComplete='tel' />
            {this.state.phoneError !== '' ? <div className="form-error-msg">{this.state.phoneError}</div> : null}
            </div>
            </fieldset>

           <fieldset className="form-group">
             <div className={this.state.companyNameError !== '' ? 'error' : ''}>
            <label htmlFor="companyName">Company Name *</label>
            <input onChange={this.handleCompanyNameChange} className="form-input" type="text" placeholder="Company Name" autoComplete='organization' />
            {this.state.companyNameError !== '' ? <div className="form-error-msg">{this.state.companyNameError}</div> : null}
            </div>
            </fieldset>

           <fieldset className="form-group">
             <div className={this.state.streetAddressError !== '' ? 'error' : ''}>
            <label htmlFor="streetAddress">Street Address *</label>
            <input onChange={this.handleStreetAddressChange} className="form-input" type="text" placeholder="Address" autoComplete='address-line1' />
            {this.state.streetAddressError !== '' ? <div className="form-error-msg">{this.state.streetAddressError}</div> : null}
            </div>
            </fieldset>

           <fieldset className="form-group">
             <div className={this.state.cityError !== '' ? 'error' : ''}>
            <label htmlFor="city">City *</label>
            <input onChange={this.handleCityChange} className="form-input" type="text" placeholder="City" autoComplete='address-level2' />
            {this.state.cityError !== '' ? <div className="form-error-msg">{this.state.cityError}</div> : null}
            </div>
            </fieldset>

           <fieldset className="form-group">
             <div className={this.state.stateError !== '' ? 'error' : ''}>
            <label htmlFor="state">State/Province *</label>
            <input onChange={this.handleStateChange} className="form-input" type="text" placeholder="State" autoComplete='address-level1' />
            {this.state.stateError !== '' ? <div className="form-error-msg">{this.state.stateError}</div> : null}
            </div>
            </fieldset>

           <fieldset className="form-group">
             <div className={this.state.zipError !== '' ? 'error' : ''}>
            <label htmlFor="zip">Zip/Postal Code *</label>
            <input onChange={this.handleZipChange} className="form-input" type="text" placeholder="Zip/Postal Code" autoComplete='postal-code' />
            {this.state.zipError !== '' ? <div className="form-error-msg">{this.state.zipError}</div> : null}
            </div>
            </fieldset>

           <fieldset className="form-group">
             <div className={this.state.countryError !== '' ? 'error' : ''}>
            <label htmlFor="country">Country *</label>
            <input onChange={this.handleCountryChange} className="form-input" type="text" placeholder="Country" autoComplete='country-name' />
            {this.state.countryError !== '' ? <div className="form-error-msg">{this.state.countryError}</div> : null}
            </div>
            </fieldset>

           <input type="submit"  onClick={this.handleSubmit} />
         </form>
     </section>
    );
  }
}
