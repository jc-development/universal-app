import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDealers as fetchDealersAction } from '../dealer-locator/actions';
import { RegistrationForm } from './child-components/RegistrationForm'
import { RegistrationModal } from './child-components/RegistrationModal'

import './assets/css/warranty-registration.css';

const initialState = {
  first_name: '',
  last_name: '',
  address_1: '',
  address_2: '',
  city: '',
  state: '',
  zip_code: '',
  country: '',
  email: '',
  phone: '',
  purchase_date: '',
  purchase_from: '',
  brand_id: 1,
  model: '',
  serial_number: '',
  model_specific_info_bow_color: '',
  model_specific_info_draw_length: '',
  model_specific_info_draw_weight: '',
  model_specific_info_hand: '',
  discover_source: '',
  discover_source_specify: '',
  modal: {
    show: false,
    loader: false,
    message: null
  }
};

class WarrantyRegistration extends Component {

  constructor (props) {
    super(props)

    this.state = {...initialState}

    this.bowModels =[
      { value: '2020 KURE', label: '2020 KURE' },
      { value: '2020 REZULT', label: '2020 REZULT' },
      { value: '2019 Valor', label: '2019 Valor' },
      { value: '2019 Revol XL', label: '2019 Revol XL' },
      { value: '2019 Ritual 35', label: '2019 Ritual 35' },
      { value: '2019 Ritual 30', label: '2019 Ritual 30' },
      { value: '2018 Ritual',  label: '2018 Ritual' },
      { value: '2018 Enlist', label: '2018 Enlist' },
      { value: '2018 Victory X', label: '2018 Victory X' },
      { value: '2018 Echelon 37', label: '2018 Echelon 37' },
      { value: '2018 Echelon 39', label: '2018 Echelon 39' },
      { value: '2017 Revol', label: '2017 Revol' },
      { value: '2017 Option 6', label: '2017 Option 6' },
      { value: '2017 Option 7', label: '2017 Option 7' },
      { value: '2017 Energy 35', label: '2017 Energy 35' },
      { value: '2017 Tempo', label: '2017 Tempo' },
      { value: '2017 Impulse 34', label: '2017 Impulse 34' },
      { value: '2017 Impulse 31', label: '2017 Impulse 31' },
      { value: '2017 Emerge', label: '2017 Emerge' },
      { value: '2017 Impression', label: '2017 Impression' },
      { value: '2017 Victory', label: '2017 Victory' },
      { value: '2017 Victory 37', label: '2017 Victory 37' },
      { value: '2016 Victory 37', label: '2016 Victory 37' },
      { value: '2016 Origin', label: '2016 Origin' },
      { value: '2016 Spirit', label: '2016 Spirit' },
      { value: '2016 Synergy', label: '2016 Synergy' },
      { value: '2016 Victory', label: '2016 Victory' },
      { value: '2016 Energy 35', label: '2016 Energy 35' },
      { value: '2016 Energy 32', label: '2016 Energy 32' },
      { value: '2016 Impulse 34', label: '2016 Impulse 34' },
      { value: '2016 Impulse 31', label: '2016 Impulse 31' },
      { value: '2015 Victory', label: '2015 Victory' },
      { value: '2015 Synergy', label: '2015 Synergy' },
      { value: '2015 Spirit', label: '2015 Spirit' },
      { value: '2015 Energy 35', label: '2015 Energy 35' },
      { value: '2015 Energy 32', label: '2015 Energy 32' },
      { value: '2014 Tour', label: '2014 Tour' },
      { value: '2014 Spirit', label: '2014 Spirit' },
      { value: '2014 Energy 35', label: '2014 Energy 35' },
      { value: '2014 Energy 32', label: '2014 Energy 32' },
      { value: '2013 Tour', label: '2013 Tour' },
      { value: '2013 Pulse', label: '2013 Pulse' },
      { value: '2013 Pure', label: '2013 Pure' },
      { value: '2013 Hunter', label: '2013 Hunter' },
      { value: '2013 Answer', label: '2013 Answer' },
      { value: '2012 Tour', label: '2012 Tour' },
      { value: '2012 Pulse', label: '2012 Pulse' },
      { value: '2012 Pure', label: '2012 Pure' },
      { value: '2012 Hunter', label: '2012 Hunter' },
      { value: '2012 Answer', label: '2012 Answer' },
      { value: '2011 Tour', label: '2011 Tour' },
      { value: '2011 Hunter', label: '2011 Hunter' },
      { value: '2011 Pure', label: '2011 Pure' },
      { value: '2011 Pulse', label: '2011 Pulse' },
      { value: '2010 XLR', label: '2010 XLR' },
      { value: '2010 Z28', label: '2010 Z28' },
      { value: '2010 GT500', label: '2010 GT500' },
      { value: '2010 Judge', label: '2010 Judge' },
      { value: '2009 XLR', label: '2009 XLR' },
      { value: '2009 Z28', label: '2009 Z28' },
      { value: '2009 GT500', label: '2009 GT500' },
      { value: '2008 XLR', label: '2008 XLR' },
      { value: '2008 Cuda', label: '2008 Cuda' },
      { value: '2008 Z28', label: '2008 Z28' },
      { value: '2008 GT500', label: '2008 GT500' },
      { value: '2008 XXL', label: '2008 XXL' },
      { value: '2008 SynX', label: '2008 SynX' },
      { value: '2008 GTO', label: '2008 GTO' },
      { value: '2008 Fire', label: '2008 Fire' },
      { value: '2008 Aigil', label: '2008 Aigil' },
      { value: '2007 Synergy', label: '2007 Synergy' },
      { value: '2007 Impulse', label: '2007 Impulse' },
      { value: '2007 Ice', label: '2007 Ice' },
      { value: '2007 Envy', label: '2007 Envy' },
      { value: '2006 Energy', label: '2006 Energy' },
      { value: '2006 E-Force', label: '2006 E-Force' }
    ]
    this.bowRiserColors =[
      { value: "Mossy Oak Break up Country",  label: "Mossy Oak Break up Country" },
      { value: "Mossy Oak Mountain Country",  label: "Mossy Oak Mountain Country" },
      { value: "Realtree Xcape",  label: "Realtree Xcape" },
      { value: "Realtree Edge",  label: "Realtree Edge" },
      { value: "Realtree Original Camo",  label: "Realtree Original Camo" },
      { value: "Realtree Xtra/AP",  label: "Realtree Xtra/AP" },
      { value: "Realtree Max-1",  label: "Realtree Max-1" },
      { value: "Realtree AP Snow",  label: "Realtree AP Snow" },
      { value: "KUIU Verde",  label: "KUIU Verde" },
      { value: "KUIU Vias",  label: "KUIU Vias" },
      { value: "Hardwoods Brown",  label: "Hardwoods Brown" },
      { value: "Olive Green",  label: "Olive Green" },
      { value: "Ninja Black",  label: "Ninja Black" },
      { value: "Silver Alloy",  label: "Silver Alloy" },
      { value: "Sour Apple",  label: "Sour Apple" },
      { value: "Laguna Teal",  label: "Laguna Teal" },
      { value: "Graphite Gray",  label: "Graphite Gray" },
      { value: "Emerald Green",  label: "Emerald Green" },
      { value: "Copper Flame",  label: "Copper Flame" },
      { value: "Canyon Orange",  label: "Canyon Orange" },
      { value: "Cobalt Blue",  label: "Cobalt Blue" },
      { value: "Surge Red",  label: "Surge Red" },
      { value: "Crimson Red",  label: "Crimson Red" },
      { value: "Famous Pink",  label: "Famous Pink" },
      { value: "Serious Pink",  label: "Serious Pink" },
      { value: "Sunset Pink",  label: "Sunset Pink" },
      { value: "Pine Green",  label: "Pine Green" },
      { value: "Purple Rain",  label: "Purple Rain" },
      { value: "Timberwolf Grey",  label: "Timberwolf Grey" },
      { value: "Vette Yellow",  label: "Vette Yellow" },
      { value: "Trendy Teal",  label: "Trendy Teal" },
      { value: "Target Red",  label: "Target Red" },
      { value: "Target Blue",  label: "Target Blue" },
      { value: "Target Purple",  label: "Target Purple" },
      { value: "Target Green",  label: "Target Green" },
      { value: "Target Pink",  label: "Target Pink" },
      { value: "Target Titanium",  label: "Target Titanium" },
      { value: "Target Orange",  label: "Target Orange" },
      { value: "Digital Ghost",  label: "Digital Ghost" },
      { value: "Mantis Green",  label: "Mantis Green" },
      { value: "Battleship Gray",  label: "Battleship Gray" },
      { value: "Independent Patriots",  label: "Independent Patriots" },
      { value: "Ground Troops Green",  label: "Ground Troops Green" },
      { value: "Tactical Tan",  label: "Tactical Tan" },
    ]
    this.bowDrawLengths =[
      { value: "23", label: "23" },
      { value: "23.5", label: "23.5" },
      { value: "24", label: "24" },
      { value: "24.5", label: "24.5" },
      { value: "25", label: "25" },
      { value: "25.5", label: "25.5" },
      { value: "26", label: "26" },
      { value: "26.5", label: "26.5" },
      { value: "27", label: "27" },
      { value: "27.5", label: "27.5" },
      { value: "28", label: "28" },
      { value: "28.5", label: "28.5" },
      { value: "29", label: "29" },
      { value: "29.5", label: "29.5" },
      { value: "30", label: "30" },
      { value: "30.5", label: "30.5" },
      { value: "31", label: "31" },
      { value: "31.5", label: "31.5" },
      { value: "32", label: "32" },
      { value: "NA", label: "NA" },
    ]
    this.bowDrawWeights =[
      { value: "40", label: "40" },
      { value: "45", label: "45" },
      { value: "50", label: "50" },
      { value: "55", label: "55" },
      { value: "60", label: "60" },
      { value: "65", label: "65" },
      { value: "70", label: "70" },
      { value: "75", label: "75" },
      { value: "80", label: "80" },
      { value: "85", label: "85" },
      { value: "90", label: "90" },
      { value: "100", label: "100" },
    ] 
    this.bowHandOrientations=[
      { value: 'Right Hand', label: 'Right Hand' },
      { value: 'Left Hand', label: 'Left Hand' },
    ]
    this.hearAboutEliteSources=[
      { value: "Pro Shop", label: "Pro Shop" },
      { value: "3D Shoot", label: "3D Shoot" },
      { value: "Spot Shoot", label: "Spot Shoot" },
      { value: "Television", label: "Television" },
      { value: "Magazine", label: "Magazine" },
      { value: "Online", label: "Online" },
      { value: "Chat Forum", label: "Chat Forum" },
      { value: "Word of Mouth", label: "Word of Mouth" },
      { value: "Editorial", label: "Editorial" },
      { value: "Other", label: "Other" },
    ]
  
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmitWarrantyRegistration = this.handleSubmitWarrantyRegistration.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount () {
    if (this.props.dealers.length < 1) this.props.fetchDealers();
  }

  handleInputChange (event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // console.log('input changed for: ', name)
    this.setState((prevState) => ({
      [name]: value,
      errors: { ...prevState.errors, [name]: undefined }
    }));
  }

  handleSelectChange (event, meta) {
    const value = event.value;
    const name = meta.name;
    this.setState((prevState, props) => ({
      [name]: value,
      errors: { ...prevState.errors, [name]: undefined }
    }));
  }

  validateFormFields () {
    const state = this.state
    const fields =[
      'first_name',
      'last_name',
      'address_1',
      'city',
      'state',
      'zip_code',
      'country',
      'email',
      'phone',
      'purchase_date',
      'purchase_from',
      'brand_id',
      'model',
      'serial_number',
      'model_specific_info_bow_color',
      'model_specific_info_draw_length',
      'model_specific_info_draw_weight',
      'model_specific_info_hand',
      'discover_source',
    ]

    let errorList = {};
    let errorCount = 0;

    fields.forEach(field => {
      if(state[field] === undefined || state[field] === '') {
        errorCount++
        errorList[field] = "Cannot be blank"
      } else {
        null
      }
    })

    const errors = {
      list: errorList,
      count: errorCount
    }

    return errors
  }

  async handleSubmitWarrantyRegistration (e) {
    try {
      e.preventDefault()
      const errors = await this.validateFormFields()
      if(errors.count > 0) return this.setState({errors: errors.list})
      this.setState({ modal: { show: true, loader: true } });

      const {first_name, last_name, address_1, address_2, city, state, zip_code, country, email, phone, purchase_date, purchase_from, brand_id, model, serial_number } = this.state
      const warrantyRegistrationData = {
        first_name,
        last_name,
        address_1,
        address_2,
        city,
        state,
        zip_code,
        country,
        email,
        phone,
        purchase_date,
        purchase_from,
        brand_id,
        model,
        serial_number,
        discover_source: `${this.state['discover_source']}${this.state['discover_source'] === 'Other' ? this.state['discover_source_specify'] !== '' ? " - " + this.state['discover_source_specify']: '' : ''}`,
        model_specific_info: {"Bow Color": this.state['model_specific_info_bow_color'],"Draw Length": this.state['model_specific_info_draw_length'],"Draw Weight": this.state['model_specific_info_draw_weight'], "Hand": this.state['model_specific_info_hand']}
      }

      const createRegistration = await fetch('https://www.elitearchery.com/api/warranty-registration', {
        method: 'post',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({warranty_registration: warrantyRegistrationData})
      })

      if (!createRegistration.ok) {
        return alert('Error: cannot create warranty registration')
      }

      const response = await createRegistration.json()
      if(response.error) return this.setState((prevState) => ({ errors: { ...prevState.errors, ...response.error.list }, modal: { show: true, loader: false, message: response } }));
      if(response.success) return this.setState({ modal: { show: true, loader: false, message: response } });

    } catch (error) {
      console.log('error: ', error)
    }
  }

  handleCloseModal (resetBool) {
    if (resetBool) {
      this.setState({...initialState})    
    } else {
      this.setState({modal: {show: false, message: null}})
    }
  }

  render () {
    const searchForDealer = [{ value: 'Search for a dealer...', label: 'Search for a dealer...' }]
    const formatDealers = () => {
      const formattedDealerList = this.props.dealers.map(dealer => {
        return {
          value: dealer.name,
          label: dealer.name
        }
      })
      return formattedDealerList
    }
    return (
      <section id="warranty-registration" className="width-85">
          <div className='center-content'>
            <h1>Warranty Registration</h1>
            <RegistrationForm
              form={(el) => this.registrationForm = el}
              state={this.state}
              bowModels={this.bowModels}
              bowRiserColors={this.bowRiserColors}
              bowDrawLengths={this.bowDrawLengths}
              bowDrawWeights={this.bowDrawWeights}
              bowHandOrientations={this.bowHandOrientations}
              dealers={this.props.dealers.length > 0 ?  formatDealers() : searchForDealer}
              sources={this.hearAboutEliteSources}
              handleInputChange={this.handleInputChange}
              handleSelectChange={this.handleSelectChange}
              submitWarrantyRegistration={this.handleSubmitWarrantyRegistration}
              errors={this.state.errors}
            />
            {this.state.modal.show ? <RegistrationModal loader={this.state.modal.loader} message={this.state.modal.message} close={this.handleCloseModal} />: null}
          </div>
      </section>
    )
  }
}

const mapStateToProps = ({ dealers }) => ({
  dealers
});

export default connect(mapStateToProps, { fetchDealers: fetchDealersAction})(WarrantyRegistration);