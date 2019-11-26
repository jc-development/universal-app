import React, { Component } from 'react';

import './assets/css/patents.css';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/fontawesome-free-solid'

export default class Patents extends Component {

  constructor(props) {
    super(props);
    this.handlePatentClick = this.handlePatentClick.bind(this)
  }

  handlePatentClick(event) {
    const target = event.currentTarget
    target.classList.toggle("active");
    const panel = target.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
      panel.style.visibility = "hidden";
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.style.visibility = "visible";
    }
  }

  render () {
    // <FontAwesomeIcon icon={faMinus} className="minus-icon" />
    return (
        <section id="patents" className='width-85'>
            <div className='center-content'>
              <h1>Patents</h1>
              <p>These products may be covered by one or more U.S. or foreign pending or issued patents.</p>
              <dl className="patents-wrapper">
                <dt>Products</dt>

                <dd className="accordion" onClick={this.handlePatentClick}><FontAwesomeIcon icon={faPlus} className="plus-icon" />Ritual 35</dd>
                <dd className="patents-info">
                 <div className="patents">
                  <p>U.S. Patent Numbers</p>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8820304" target="_blank">8,820,304 - Adjustable roller guard for compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9599424" target="_blank">9,599,424 - Cage design</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9377266" target="_blank">9,377,266 - Two step riser w/ cage</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8720425" target="_blank">8,720,425 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8360041" target="_blank">8,360,041 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8006679" target="_blank">8,006,679 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=7997259" target="_blank">7,997,259 - Dual cam system; patent licensed from Rex Darlington</a>
                 </div>
                </dd>

                <dd className="accordion" onClick={this.handlePatentClick}><FontAwesomeIcon icon={faPlus} className="plus-icon" />Ritual 30</dd>
                <dd className="patents-info">
                 <div className="patents">
                  <p>U.S. Patent Numbers</p>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8820304" target="_blank">8,820,304 - Adjustable roller guard for compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9599424" target="_blank">9,599,424 - Cage design</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9377266" target="_blank">9,377,266 - Two step riser w/ cage</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8720425" target="_blank">8,720,425 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8360041" target="_blank">8,360,041 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8006679" target="_blank">8,006,679 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=7997259" target="_blank">7,997,259 - Dual cam system; patent licensed from Rex Darlington</a>
                 </div>
                </dd>

                <dd className="accordion" onClick={this.handlePatentClick}><FontAwesomeIcon icon={faPlus} className="plus-icon" />Ritual</dd>
                <dd className="patents-info">
                 <div className="patents">
                  <p>U.S. Patent Numbers</p>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8820304" target="_blank">8,820,304 - Adjustable roller guard for compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9599424" target="_blank">9,599,424 - Cage design</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9377266" target="_blank">9,377,266 - Two step riser w/ cage</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8720425" target="_blank">8,720,425 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8360041" target="_blank">8,360,041 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8006679" target="_blank">8,006,679 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=7997259" target="_blank">7,997,259 - Dual cam system; patent licensed from Rex Darlington</a>
                 </div>
                </dd>

                <dd className="accordion" onClick={this.handlePatentClick}><FontAwesomeIcon icon={faPlus} className="plus-icon" />Echelon 37</dd>
                <dd className="patents-info">
                 <div className="patents">
                  <p>U.S. Patent Numbers</p>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9599424" target="_blank">9,599,424 - Cage design</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9377266" target="_blank">9,377,266 - Two step riser w/ cage</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8720425" target="_blank">8,720,425 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8360041" target="_blank">8,360,041 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8006679" target="_blank">8,006,679 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=7997259" target="_blank">7,997,259 - Dual cam system; patent licensed from Rex Darlington</a>
                 </div>
                </dd>

                <dd className="accordion" onClick={this.handlePatentClick}><FontAwesomeIcon icon={faPlus} className="plus-icon" />Echelon 39</dd>
                <dd className="patents-info">
                 <div className="patents">
                  <p>U.S. Patent Numbers</p>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9599424" target="_blank">9,599,424 - Cage design</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9377266" target="_blank">9,377,266 - Two step riser w/ cage</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8720425" target="_blank">8,720,425 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8360041" target="_blank">8,360,041 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8006679" target="_blank">8,006,679 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=7997259" target="_blank">7,997,259 - Dual cam system; patent licensed from Rex Darlington</a>
                 </div>
                </dd>

                <dd className="accordion" onClick={this.handlePatentClick}><FontAwesomeIcon icon={faPlus} className="plus-icon" />Victory X</dd>
                <dd className="patents-info">
                 <div className="patents">
                  <p>U.S. Patent Numbers</p>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9599424" target="_blank">9,599,424 - Cage design</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9377266" target="_blank">9,377,266 - Two step riser w/ cage</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8925536" target="_blank">8,925,536 - Cable guard mounting technology. Used in all non-roller cable guard.</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8720425" target="_blank">8,720,425 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8360041" target="_blank">8,360,041 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8006679" target="_blank">8,006,679 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=7997259" target="_blank">7,997,259 - Dual cam system; patent licensed from Rex Darlington</a>
                 </div>
                </dd>

                <dd className="accordion" onClick={this.handlePatentClick}><FontAwesomeIcon icon={faPlus} className="plus-icon" />Enlist</dd>
                <dd className="patents-info">
                 <div className="patents">
                  <p>U.S. Patent Numbers</p>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8925536" target="_blank">8,925,536 - Cable guard mounting technology. Used in all non-roller cable guard.</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8720425" target="_blank">8,720,425 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8360041" target="_blank">8,360,041 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8006679" target="_blank">8,006,679 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=7997259" target="_blank">7,997,259 - Dual cam system; patent licensed from Rex Darlington</a>
                 </div>
                </dd>

                <dd className="accordion" onClick={this.handlePatentClick}><FontAwesomeIcon icon={faPlus} className="plus-icon" />Revol</dd>
                <dd className="patents-info">
                 <div className="patents">
                  <p>U.S. Patent Numbers</p>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8820304" target="_blank">8,820,304 - Adjustable roller guard for compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9599424" target="_blank">9,599,424 - Cage design</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9377266" target="_blank">9,377,266 - Two step riser w/ cage</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8720425" target="_blank">8,720,425 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8360041" target="_blank">8,360,041 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8006679" target="_blank">8,006,679 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=7997259" target="_blank">7,997,259 - Dual cam system; patent licensed from Rex Darlington</a>
                 </div>
                </dd>

                <dd className="accordion" onClick={this.handlePatentClick}><FontAwesomeIcon icon={faPlus} className="plus-icon" />Option 6</dd>
                <dd className="patents-info">
                 <div className="patents">
                  <p>U.S. Patent Numbers</p>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8820304" target="_blank">8,820,304 - Adjustable roller guard for compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9599424" target="_blank">9,599,424 - Cage design</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9377266" target="_blank">9,377,266 - Two step riser w/ cage</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8720425" target="_blank">8,720,425 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8360041" target="_blank">8,360,041 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8006679" target="_blank">8,006,679 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=7997259" target="_blank">7,997,259 - Dual cam system; patent licensed from Rex Darlington</a>
                 </div>
                </dd>

                <dd className="accordion" onClick={this.handlePatentClick}><FontAwesomeIcon icon={faPlus} className="plus-icon" />Option 7</dd>
                <dd className="patents-info">
                 <div className="patents">
                  <p>U.S. Patent Numbers</p>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8820304" target="_blank">8,820,304 - Adjustable roller guard for compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9599424" target="_blank">9,599,424 - Cage design</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9377266" target="_blank">9,377,266 - Two step riser w/ cage</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8720425" target="_blank">8,720,425 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8360041" target="_blank">8,360,041 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8006679" target="_blank">8,006,679 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=7997259" target="_blank">7,997,259 - Dual cam system; patent licensed from Rex Darlington</a>
                 </div>
                </dd>

                <dd className="accordion" onClick={this.handlePatentClick}><FontAwesomeIcon icon={faPlus} className="plus-icon" />Tempo</dd>
                <dd className="patents-info">
                 <div className="patents">
                  <p>U.S. Patent Numbers</p>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9599424" target="_blank">9,599,424 - Cage design</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9377266" target="_blank">9,377,266 - Two step riser w/ cage</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8720425" target="_blank">8,720,425 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8360041" target="_blank">8,360,041 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8006679" target="_blank">8,006,679 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=7997259" target="_blank">7,997,259 - Dual cam system; patent licensed from Rex Darlington</a>
                 </div>
                </dd>

                <dd className="accordion" onClick={this.handlePatentClick}><FontAwesomeIcon icon={faPlus} className="plus-icon" />Emerge</dd>
                <dd className="patents-info">
                 <div className="patents">
                  <p>U.S. Patent Numbers</p>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9599424" target="_blank">9,599,424 - Cage design</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9377266" target="_blank">9,377,266 - Two step riser w/ cage</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8720425" target="_blank">8,720,425 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8360041" target="_blank">8,360,041 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8006679" target="_blank">8,006,679 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=7997259" target="_blank">7,997,259 - Dual cam system; patent licensed from Rex Darlington</a>
                 </div>
                </dd>

                <dd className="accordion" onClick={this.handlePatentClick}><FontAwesomeIcon icon={faPlus} className="plus-icon" />Impression</dd>
                <dd className="patents-info">
                 <div className="patents">
                  <p>U.S. Patent Numbers</p>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9599424" target="_blank">9,599,424 - Cage design</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9377266" target="_blank">9,377,266 - Two step riser w/ cage</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8720425" target="_blank">8,720,425 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8360041" target="_blank">8,360,041 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8006679" target="_blank">8,006,679 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=7997259" target="_blank">7,997,259 - Dual cam system; patent licensed from Rex Darlington</a>
                 </div>
                </dd>

                <dd className="accordion" onClick={this.handlePatentClick}><FontAwesomeIcon icon={faPlus} className="plus-icon" />Energy 35</dd>
                <dd className="patents-info">
                 <div className="patents">
                  <p>U.S. Patent Numbers</p>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9599424" target="_blank">9,599,424 - Cage design</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9377266" target="_blank">9,377,266 - Two step riser w/ cage</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8925536" target="_blank">8,925,536 - Cable guard mounting technology. Used in all non-roller cable guard.</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8720425" target="_blank">8,720,425 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8360041" target="_blank">8,360,041 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8006679" target="_blank">8,006,679 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=7997259" target="_blank">7,997,259 - Dual cam system; patent licensed from Rex Darlington</a>
                 </div>
                </dd>

                <dd className="accordion" onClick={this.handlePatentClick}><FontAwesomeIcon icon={faPlus} className="plus-icon" />Impulse 31</dd>
                <dd className="patents-info">
                 <div className="patents">
                  <p>U.S. Patent Numbers</p>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9599424" target="_blank">9,599,424 - Cage design</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9377266" target="_blank">9,377,266 - Two step riser w/ cage</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8925536" target="_blank">8,925,536 - Cable guard mounting technology. Used in all non-roller cable guard.</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8720425" target="_blank">8,720,425 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8360041" target="_blank">8,360,041 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8006679" target="_blank">8,006,679 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=7997259" target="_blank">7,997,259 - Dual cam system; patent licensed from Rex Darlington</a>
                 </div>
                </dd>

                <dd className="accordion" onClick={this.handlePatentClick}><FontAwesomeIcon icon={faPlus} className="plus-icon" />Impulse 34</dd>
                <dd className="patents-info">
                 <div className="patents">
                  <p>U.S. Patent Numbers</p>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9599424" target="_blank">9,599,424 - Cage design</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9377266" target="_blank">9,377,266 - Two step riser w/ cage</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8925536" target="_blank">8,925,536 - Cable guard mounting technology. Used in all non-roller cable guard.</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8720425" target="_blank">8,720,425 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8360041" target="_blank">8,360,041 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8006679" target="_blank">8,006,679 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=7997259" target="_blank">7,997,259 - Dual cam system; patent licensed from Rex Darlington</a>
                 </div>
                </dd>

                <dd className="accordion" onClick={this.handlePatentClick}><FontAwesomeIcon icon={faPlus} className="plus-icon" />Victory</dd>
                <dd className="patents-info">
                 <div className="patents">
                  <p>U.S. Patent Numbers</p>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9599424" target="_blank">9,599,424 - Cage design</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9377266" target="_blank">9,377,266 - Two step riser w/ cage</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8925536" target="_blank">8,925,536 - Cable guard mounting technology. Used in all non-roller cable guard.</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8720425" target="_blank">8,720,425 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8360041" target="_blank">8,360,041 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8006679" target="_blank">8,006,679 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=7997259" target="_blank">7,997,259 - Dual cam system; patent licensed from Rex Darlington</a>
                 </div>
                </dd>

                <dd className="accordion" onClick={this.handlePatentClick}><FontAwesomeIcon icon={faPlus} className="plus-icon" />Victory 37</dd>
                <dd className="patents-info">
                 <div className="patents">
                  <p>U.S. Patent Numbers</p>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9599424" target="_blank">9,599,424 - Cage design</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=9377266" target="_blank">9,377,266 - Two step riser w/ cage</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8925536" target="_blank">8,925,536 - Cable guard mounting technology. Used in all non-roller cable guard.</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8720425" target="_blank">8,720,425 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8360041" target="_blank">8,360,041 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=8006679" target="_blank">8,006,679 - Two-track system for dual cam compound bow</a>
                  <a href="http://pdfpiw.uspto.gov/.piw?pagenum=0&docid=7997259" target="_blank">7,997,259 - Dual cam system; patent licensed from Rex Darlington</a>
                 </div>
                </dd>

              </dl>
             </div>
        </section>
    )
  }
}
