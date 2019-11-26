import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VideoPlayer from './../../videojs-player/VideoPlayer';
// import SelectDealer from '../../bows/bow-model/child-components/bow-config-panel/select-dealer/SelectDealer';
import DealerLocator from './../../dealer-locator/DealerLocator';
import './../assets/css/shootability.css';

export default class Shootability extends Component {

  render() {
    const videoJsOptions = {
      id: "homeShootabilityVid",
      muted: true,
      autoplay: true,
      playsinline: true,
      loop: true,
      controls: false,
      aspectRatio: "16:9",
      preload: "auto",
      poster: "https://s3.amazonaws.com/elite-website/v2/videos/homepage/shootability-test-poster.jpg",
      sources: [{
        src: "https://s3.amazonaws.com/elite-website/v2/videos/homepage/shootability-test-home.mp4",
        type: 'video/mp4'
      }],
      // onPlay: this.onVideoPlay,
      // onPause: this.onVideoPause
    }

    const heroVideo = ( props ) => (
      <Link to="/elite-bows">
      <div className="home-hero-video">
        {/* <form>
                <h3>Schedule Your Shootability Test</h3> */}
                {/* <ol>
                  <li>Enter your contact information.</li>
                  <li>Enter your location below to find a local dealer.</li>
                  <li>Click submit and a dealer will be contacting you shortly.</li>
                </ol> */}
                {/* <div className="form-left-side">
                  <DealerLocator />
                </div> */}

              {/* <div className={this.state.dealerNameErrorMsg !== '' ? 'error' : null}> */}
              {/* <div className="form-right-side">
                {/* <SelectDealer /> */}
                {/* <div className="form-group"> */}
                  {/* <label>Elite Bow Model</label> */}
                  {/* <select>
                    <option value="ritual">Ritual</option>
                    <option value="victory-x">Victory X</option>
                    <option value="echelon-37">Echelon 37</option>
                    <option value="echelon-39">Echelon 39</option>
                    <option value="enlist">Enlist</option>
                    <option value="revol">ReVol</option>
                    <option value="option-6">Option 6</option>
                    <option value="option-7">Option 7</option>
                    <option value="impulse-31">Impulse 31</option>
                    <option value="impulse-34">Impulse 34</option>
                    <option value="tempo">Tempo</option>
                    <option value="impression">Impression</option>
                    <option value="emerge">Emerge</option>
                  </select>
                </div> */}

                {/* <div className="form-group"> */}
                  {/* <div className={this.state.customerNameErrorMsg !== '' ? 'error' : null}> */}
                  {/* <div>
                    <label>First and Last Name *</label>
                    <input type="text" className="form-input" placeholder="First and Last Name" /> */}
                    {/* <input type="text" className="form-input" placeholder="First and Last Name" onChange={this.handleNameChange} />
                    {this.state.customerNameErrorMsg !== '' ? <p>{this.state.customerNameErrorMsg}</p> : null} */}
                  {/* </div>
                </div>

                <div className="form-group"> */}
                  {/* <div className={this.state.customerEmailErrorMsg !== '' ? 'error' : null}> */}
                    {/* <div>
                    <label>Email *</label>
                    <input type="email" className="form-input" placeholder="Email Address" /> */}
                    {/* <input type="email" className="form-input" placeholder="Email Address" onChange={this.handleEmailChange} />
                    {this.state.customerEmailErrorMsg !== '' ? <p>{this.state.customerEmailErrorMsg}</p> : null} */}
                  {/* </div>
                </div>

                <div className="form-group"> */}
                  {/* <div className={this.state.customerPhoneErrorMsg !== '' ? 'error' : null}> */}
                  {/* <div>
                    <label>Phone Number *</label>
                    <input type="phone" className="form-input" placeholder="(555) 555-5555" /> */}
                    {/* <input type="phone" className="form-input" placeholder="(555) 555-5555" onChange={this.handlePhoneChange} /> */}
                    {/* {this.state.customerPhoneErrorMsg !== '' ? <p>{this.state.customerPhoneErrorMsg}</p> : null} */}
                  {/* </div>
                </div>
              </div> */}

                {/* {this.state.dealerNameErrorMsg !== '' ? <p>{this.state.dealerNameErrorMsg}</p> : null} */}
              {/* </div> */}
            {/* </div> */}
            {/* <div className="shootability-buttons">
              { !!allGood() ? <button onClick={this.handleSend}>Send</button> : <button id="inactive-alert" onClick={this.handleAlert}>Send</button>}
              <button onClick={this.handleModalClose}>Close</button>
            </div> */}
          {/* </article> */}
        {/* </form> */}

          <div className="home-hero-video-text">

            <header>
              <p>ELITE DWELL ZONES MAXIMIZE COMFORT</p>
              <h1>Shoot an Elite TODAY</h1>
            </header>
          <p>SCHEDULE A SHOOTABILITY TEST AT YOUR LOCAL DEALER</p>
          <button>PICK YOUR BOW</button>
        </div>
        <VideoPlayer { ...videoJsOptions } />
       </div>
     </Link>
    );
  return heroVideo()
  }
}
