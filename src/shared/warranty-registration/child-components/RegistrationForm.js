import React from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';

export const RegistrationForm = (props) => {

  const filterDealers = (inputValue) => {
    return props.dealers.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterDealers(inputValue));
    }, 250);
  };


  return (
    <form ref={props.form} onSubmit={props.submitWarrantyRegistration}>
      <div class="form-section">
        <div class="form-section-header">
          <h6>Customer Information</h6>
          <i><span class="required">*</span>Required fields </i>
        </div>

        <div class="form-row-flex">
          <fieldset class="form-group">
            <label for="first_name">First Name<span class="required">*</span></label>
            <input className={props.errors && props.errors.first_name ? "form-input errors" : "form-input" } autoCapitalize="words" autoComplete="given-name" type="text" name="first_name" id="first_name" placeholder="First Name" onChange={props.handleInputChange} value={props.state.first_name} />
            {props.errors && props.errors.first_name ? <span className="error-message">{props.errors.first_name}</span> : null }
          </fieldset>

          <fieldset class="form-group">
            <label for="last_name">Last Name<span class="required">*</span></label>
            <input className={props.errors && props.errors.last_name ? "form-input errors" : "form-input" } autoCapitalize="words" autoComplete="family-name" type="text" name="last_name" id="last_name" placeholder="Last Name" onChange={props.handleInputChange} value={props.state.last_name} />
            {props.errors && props.errors.last_name ? <span className="error-message">{props.errors.last_name}</span> : null }
          </fieldset>
        </div>

        <hr/>

        <div class="form-row-flex">
          <fieldset class="form-group">
            <label for="address_1">Address 1<span class="required">*</span></label>
            <input className={props.errors && props.errors.address_1 ? "form-input errors" : "form-input" } autoCapitalize="words" autoComplete="address-line1" type="text" name="address_1" id="address_1" placeholder="Address" onChange={props.handleInputChange} value={props.state.address_1} />
            {props.errors && props.errors.address_1 ? <span className="error-message">{props.errors.address_1}</span> : null }
          </fieldset>

          <fieldset class="form-group">
            <label for="address_2">Address 2 (Optional)</label>
            <input className={props.errors && props.errors.address_2 ? "form-input errors" : "form-input" } autoCapitalize="words" autoComplete="address-line2" type="text" name="address_2" id="address_2" placeholder="Address" onChange={props.handleInputChange} value={props.state.address_2} />
            {props.errors && props.errors.address_2 ? <span className="error-message">{props.errors.address_2}</span> : null }
          </fieldset>
        </div>

        <div class="form-row-flex">
          <fieldset class="form-group">
            <label for="city">City<span class="required">*</span></label>
            <input className={props.errors && props.errors.city ? "form-input errors" : "form-input" } autoCapitalize="words" autoComplete="address-level2" type="text" name="city" id="city" placeholder="City" onChange={props.handleInputChange} value={props.state.city} />
            {props.errors && props.errors.city ? <span className="error-message">{props.errors.city}</span> : null }
          </fieldset>

          <fieldset class="form-group">
            <label for="state">State<span class="required">*</span></label>
            <input className={props.errors && props.errors.state ? "form-input errors" : "form-input" } autoCapitalize="words" autoComplete="address-level1" type="text" name="state" id="state" placeholder="State" onChange={props.handleInputChange} value={props.state.state} />
            {props.errors && props.errors.state ? <span className="error-message">{props.errors.state}</span> : null }
          </fieldset>

          <fieldset class="form-group">
            <label for="zip_code">Zip Code<span class="required">*</span></label>
            <input className={props.errors && props.errors.zip_code ? "form-input errors" : "form-input" } autoCapitalize="words" autoComplete="postal-code" type="text" name="zip_code" id="zip_code" placeholder="Zip Code" onChange={props.handleInputChange} value={props.state.zip_code} />
            {props.errors && props.errors.zip_code ? <span className="error-message">{props.errors.zip_code}</span> : null }
          </fieldset>

          <fieldset class="form-group">
            <label for="country">Country<span class="required">*</span></label>
            <input className={props.errors && props.errors.country ? "form-input errors" : "form-input" } autoCapitalize="words" autoComplete="country-name" type="text" name="country" id="country" placeholder="Country" onChange={props.handleInputChange} value={props.state.country} />
            {props.errors && props.errors.country ? <span className="error-message">{props.errors.country}</span> : null }
          </fieldset>
        </div>

        <div class="form-row-flex">
          <fieldset class="form-group">
            <label for="email">Email Address<span class="required">*</span></label>
            <input className={props.errors && props.errors.email ? "form-input errors" : "form-input" } autoCorrect="off" autoCapitalize="off" autoComplete="email" type="email" name="email" id="email" placeholder="Email Address" onChange={props.handleInputChange} value={props.state.email} />
            {props.errors && props.errors.email ? <span className="error-message">{props.errors.email}</span> : null }
          </fieldset> 

          <fieldset class="form-group">
            <label for="phone">Phone Number<span class="required">*</span></label>
            <input className={props.errors && props.errors.phone ? "form-input errors" : "form-input" } autoComplete="tel-national" type="tel" name="phone" id="phone" placeholder="5854440204" onChange={props.handleInputChange} value={props.state.phone} />
            {props.errors && props.errors.phone ? <span className="error-message">{props.errors.phone}</span> : null }
          </fieldset>
        </div>
      </div>
  

    
      <div class="form-section">
        <div class="form-section-header">
          <h6>Bow Information</h6>
          <i><span class="required">*</span>Required fields </i>
        </div>

        <div class="form-row-flex">
          <fieldset class="form-group">
            <label for="serial_number">Serial Number<span class="required">*</span></label>
            <input className={props.errors && props.errors.serial_number ? "form-input errors" : "form-input" } autoCapitalize="off" type="text" name="serial_number" id="serial_number" placeholder="Serial Number" onChange={props.handleInputChange} value={props.state.serial_number} />
            {props.errors && props.errors.serial_number ? <span className="error-message">{props.errors.serial_number}</span> : null }
          </fieldset>
        </div>

        <div class="form-row-flex">
          <fieldset class="form-group">
            <label for="model">Bow Model<span class="required">*</span></label>
            <Select name="model" className={props.errors && props.errors.model ? "errors" : null } options={props.bowModels}  onChange={props.handleSelectChange} value={props.state.model !== '' ? {value: props.state.model, label: props.state.model} : null} />
            {props.errors && props.errors.model ? <span className="error-message">{props.errors.model}</span> : null }
          </fieldset>

          <fieldset class="form-group">
            <label for="model_specific_info_bow_color">Bow Color<span class="required">*</span></label>
            <Select name="model_specific_info_bow_color" className={props.errors && props.errors.model_specific_info_bow_color ? "errors" : null } options={props.bowRiserColors} onChange={props.handleSelectChange} value={props.state.model_specific_info_bow_color !== '' ? {value: props.state.model_specific_info_bow_color, label: props.state.model_specific_info_bow_color} : null} />
            {props.errors && props.errors.model_specific_info_bow_color ? <span className="error-message">{props.errors.model_specific_info_bow_color}</span> : null }
          </fieldset>
        </div>

        <div class="form-row-flex">
          <fieldset class="form-group">
            <label for="model_specific_info_draw_length">Draw Length<span class="required">*</span></label>
            <Select name="model_specific_info_draw_length" className={props.errors && props.errors.model_specific_info_draw_length ? "errors" : null } options={props.bowDrawLengths} onChange={props.handleSelectChange} value={props.state.model_specific_info_draw_length !== '' ? {value: props.state.model_specific_info_draw_length, label: props.state.model_specific_info_draw_length} : null} />
            {props.errors && props.errors.model_specific_info_draw_length ? <span className="error-message">{props.errors.model_specific_info_draw_length}</span> : null }
          </fieldset>

          <fieldset class="form-group">
            <label for="model_specific_info_draw_weight">Draw Weight<span class="required">*</span></label>
            <Select name="model_specific_info_draw_weight" className={props.errors && props.errors.model_specific_info_draw_weight ? "errors" : null } options={props.bowDrawWeights} onChange={props.handleSelectChange} value={props.state.model_specific_info_draw_weight !== '' ? {value: props.state.model_specific_info_draw_weight, label: props.state.model_specific_info_draw_weight} : null}/>
            {props.errors && props.errors.model_specific_info_draw_weight ? <span className="error-message">{props.errors.model_specific_info_draw_weight}</span> : null }
          </fieldset>

          <fieldset class="form-group">
            <label for="model_specific_info_hand">Hand<span class="required">*</span></label>
            <Select name="model_specific_info_hand" className={props.errors && props.errors.model_specific_info_hand ? "errors" : null } options={props.bowHandOrientations} onChange={props.handleSelectChange} value={props.state.model_specific_info_hand !== '' ? {value: props.state.model_specific_info_hand, label: props.state.model_specific_info_hand} : null} />
            {props.errors && props.errors.model_specific_info_hand ? <span className="error-message">{props.errors.model_specific_info_hand}</span> : null }
          </fieldset>
        </div>

        <hr/>

        <div class="form-row-flex">      
          <fieldset class="form-group">
            <label for="purchase_from">Dealer Name<span class="required">*</span></label>
            <AsyncSelect name="purchase_from" className={props.errors && props.errors.purchase_from ? "errors" : null } loadOptions={loadOptions}  defaultOptions={props.dealers} onChange={props.handleSelectChange} value={props.state.purchase_from !== '' ? {value: props.state.purchase_from, label: props.state.purchase_from} : null} />
            {props.errors && props.errors.purchase_from ? <span className="error-message">{props.errors.purchase_from}</span> : null }
          </fieldset>

          <fieldset class="form-group">
            <label for="purchase_date">Purchase Date<span class="required">*</span></label>
            <input className={props.errors && props.errors.purchase_date ? "form-input errors" : "form-input" } autoCapitalize="off" type="date" name="purchase_date" id="purchase_date" onChange={props.handleInputChange} value={props.state.purchase_date} />
            {props.errors && props.errors.purchase_date ? <span className="error-message">{props.errors.purchase_date}</span> : null }
          </fieldset>
        </div>

        <hr/>

        <div class="form-row-flex">      
          <fieldset class="form-group">
            <label for="discover_source">How Did You Hear About Elite?<span class="required">*</span></label>
            <Select name="discover_source" className={props.errors && props.errors.discover_source ? "errors" : null } options={props.sources} onChange={props.handleSelectChange} value={props.state.discover_source !== '' ? {value: props.state.discover_source, label: props.state.discover_source} : null} />
            {props.errors && props.errors.discover_source ? <span className="error-message">{props.errors.discover_source}</span> : null }
          </fieldset>
          {props.state.discover_source === 'Other' ? 
              <fieldset class="form-group">
                <label for="discover_source_specify">Please Specify<span class="required">*</span></label>
                <input className={props.errors && props.errors.discover_source_specify ? "form-input errors" : "form-input" } type="text" name="discover_source_specify" id="discover_source_specify" placeholder="specify" onChange={props.handleInputChange} value={props.state.discover_source_specify} />
                {props.errors && props.errors.discover_source_specify ? <span className="error-message">{props.errors.discover_source_specify}</span> : null }
              </fieldset>
            :
              null
          }
        </div>

      </div>
      <input class="btn btn-primary" type="submit" value="Register Your Bow" style={{ display: 'flex', marginLeft: 'auto', padding: '1rem', textTransform: 'uppercase'}} />
    </form>
  );
}