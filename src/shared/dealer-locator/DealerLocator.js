import React, { Component } from 'react';
import { connect } from 'react-redux';

// import LocatorPageMap from "./child-components/LocatorPageMap"
import { LocatorMap } from "./child-components/LocatorMap"
import { Dealer } from "./child-components/Dealer"

import { fetchDealers as fetchDealersAction } from './actions';
import {
  selectDealer as selectDealerAction,
  selectedDealer as selectedDealerAction
} from './../bows/bow-model/child-components/bow-model-page/bow-config/config-panel/child-components/add-to-cart/select-dealer/actions';

import queryString from 'query-string';

import './assets/css/dealer-locator.css';

import TweenMax from 'gsap/TweenMax';
import TimelineMax from 'gsap/TimelineMax';

import { YoutubeVideo } from '../reusable/YoutubeVideo'
class DealerMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: 43.064049,
        lng: -77.675990
      },
      zoom: 8,
      markers: [],
      markerIndex: 10000,
      toggleMap: true,
      mapMounted: false,
      isMobile: false
    };

    this.fetchAllDealers = this.fetchAllDealers.bind(this);
    this.handleMapMounted = this.handleMapMounted.bind(this);
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
    this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
    this.handleDealerClick = this.handleDealerClick.bind(this);
    this.openDealerModal = this.openDealerModal.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleInfoClose = this.handleInfoClose.bind(this);
    this.handleDealerClickFromMarker = this.handleDealerClickFromMarker.bind(this);
    this.handleToggleMapDealerList = this.handleToggleMapDealerList.bind(this);

    this.handleGeoLocation = this.handleGeoLocation.bind(this);
    this.handleLocationError = this.handleLocationError.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.searchBoxInput = null;
    this.dealerSearchResults = null;
    this.animateList = new TimelineMax({paused: true});
  }

  componentWillMount() {
    this.fetchAllDealers()
  }

  componentDidMount() {
    // this.animateList = new TimelineMax({paused: true});
    this.animateList.to(this.dealerSearchResults, 0.5, {x: 0, force3D: true});
    window.addEventListener('resize', this.handleResize);
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.searchBoxInput = null;
    this.dealerSearchResults = null;
    this.animateList = null;
  }  

  fetchAllDealers() {
    if (this.props.dealers.length < 1) this.props.fetchDealers();
  }

  handleMapMounted() {
    // console.log('search-input on map mount: ', this.searchBoxInput)
    this.geocoder = new google.maps.Geocoder;
    const googleAutoComplete = new google.maps.places.Autocomplete(this.searchBoxInput);
    google.maps.event.addListener(googleAutoComplete, 'place_changed', () => {this.handlePlacesChanged()});

    if(!this.props.location.search.address) {
      this.handleGeoLocation();
    }

    this.setState({mapMounted: true})
  }

  handlePlacesChanged(event) {
    if(event) {
      event.preventDefault();
    }
    const address = this.searchBoxInput.value;
    if (this.geocoder) {
      // const that = this
      this.geocoder.geocode({'address': address}, (results, status) => {
        if (status == "OK") {
          if (status != "ZERO_RESULTS") {
            const originLatLng = results[0].geometry.location;
            this.distanceFromOrigin(originLatLng)
            this.setState({
              center: originLatLng,
              zoom: 9,
            });
          } else {
            alert("No results found while geocoding.");
          }
        } else {
          alert("No Dealers were found using your location.");
        }
      })
    }
  }

  distanceFromOrigin(originLatLng) {
    let dealersWithDistance = this.props.dealers.map( (dealer, i) => {
      let dealerLatLng = new window.google.maps.LatLng(dealer.lat,dealer.lng)
      let dealerObject =
        {
          name: dealer.name,
          email: dealer.email,
          address: dealer.address,
          city: dealer.city,
          state: dealer.state,
          postal: dealer.postal,
          country: dealer.country,
          phone: dealer.phone,
          lat: dealer.lat,
          lng: dealer.lng,
          id: dealer.id,
          distance: window.google.maps.geometry.spherical.computeDistanceBetween(originLatLng, dealerLatLng) / 1609.344,
          kure_available: dealer.kure_available,
          rezult_available: dealer.rezult_available
        }
      return dealerObject
    })

    this._orderDealers = _.orderBy(dealersWithDistance, (dealer) => {
      return parseFloat(dealer.distance)
    }, 'asc');

  }

  handleSearchKeyPress(event) {
    if(event.key === "Enter") {
      this.handlePlacesChanged(event)
    }
  }

  handleDealerClick(dealer) {
    // console.log('handleDealerClick!!!');
    const selectDealerInfo = {
      dealerName: dealer.dealerName,
      dealerAddress: dealer.dealerAddress,
      dealerCity: dealer.dealerCity,
      dealerState: dealer.dealerState,
      dealerZip: dealer.dealerPostal,
      dealerPhone: dealer.dealerPhone,
      dealerEmail: dealer.dealerEmail,
      dealerId: dealer.dealerId
    };
    // reset or close drop down after selecting dealer.
    this.setState({
      center: {
        lat: parseFloat(dealer.dealerLat),
        lng: parseFloat(dealer.dealerLong)
      },
      zoom: 11,
    }, () => {
      this.handleMarkerClick(dealer, dealer.dealerId);
    });
  }

  handleMarkerClick (marker, index) {
    this.setState({ markerIndex: index })
  }

  handleInfoClose() {
    this.setState({ markerIndex: 10000, zoom: 8 })
  }

  openDealerModal (event) {
    event.preventDefault();
    const noDealer = {
      dealerName: "N/A",
      dealerAddress: "N/A",
      dealerPhone: "N/A"
    };
    this.props.selectDealer(noDealer);
  }

  handleDealerClickFromMarker(dealer) {
    const selectDealerInfo = {
      dealerName: dealer.name,
      dealerAddress: dealer.address,
      dealerCity: dealer.city,
      dealerState: dealer.state,
      dealerZip: dealer.postal,
      dealerPhone: dealer.phone,
      dealerEmail: dealer.email,
      dealerId: dealer.id
    };
    this.props.selectDealer(selectDealerInfo);
  }

  handleToggleMapDealerList() {
    if(this.state.toggleMap) {
      this.setState({toggleMap: false}, () => {
        this.animateList.play()
      })
    } else {
      this.setState({toggleMap: true}, () => {
        this.animateList.reverse().eventCallback("onReverseComplete", () => {
          TweenMax.set(this.dealerSearchResults,{clearProps:'all'});
        });
      })
    }
  }

  // HTML5 Geolocation Search
  handleGeoLocation() {
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
          }, ()=> {
            let origin
            if(typeof this.state.center.lat === "function") {
              origin = this.state.center
            } else {
              origin = new google.maps.LatLng(this.state.center.lat,this.state.center.lng)
            }
            this.distanceFromOrigin(origin)
          })
        }, () => { this.handleLocationError(true) }
      )
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false);
    }
  }

  // HTML5 geolocation error checking
  handleLocationError(browserHasGeolocation) {
    if(browserHasGeolocation) {
      // console.log('geolocation available but disabled')
    } else {
      alert('Error: Your browser doesn\'t support geolocation.')
    }
  }

  handleResize() {
    if (window.innerWidth <= 900) {
      this.setState({isMobile: true})
    } else {
      this.setState({isMobile: false})
    }
  }


  render() {
    let dealerList;
    if (this._orderDealers) {
      dealerList = this._orderDealers.map((dealer, i) => {
        if(i < 60) {
          return(
            <Dealer
              handleDealerClick={this.handleDealerClick}
              dealerName={dealer.name}
              dealerAddress={dealer.address}
              dealerCity={dealer.city}
              dealerState={dealer.state}
              dealerPostal={dealer.postal}
              dealerPhone={dealer.phone}
              dealerDistance={dealer.distance.toFixed(1)}
              dealerLat={dealer.lat}
              dealerLong={dealer.lng}
              dealerId={dealer.id}
              dealerKure={dealer.kure_available}
              dealerRezult={dealer.rezult_available}
            />
          )
        }
      })
    }
    return (
      <section id="dealer-locator" className="width-85">
        <h1 className="title center-content">Find an official Elite Dealer</h1>
        <div id="search-input" className="form-group">
          <input
            onFocus={this.fetchAllDealers}
            id="search-address"
            className="form-input"
            ref={(searchBoxInput) => { this.searchBoxInput = searchBoxInput }}
            type="text"
            placeholder="Please enter your address"
            autoComplete="off"
            onKeyPress={this.handleSearchKeyPress}
          />
          <button className="search-button" onClick={this.handlePlacesChanged}>GO</button>
        </div>
        <div id="map-content-wrapper">
          {this.state.isMobile && this._orderDealers ? <button className="toggle-map-dealer-list" onClick={this.handleToggleMapDealerList}>{this.state.toggleMap ? 'View Dealer List' : 'Hide Dealer List' }</button> : null}
            <div className={this.state.isMobile ? "dealer-search-results" :  "dealer-search-results  desktop"} ref={(dealerSearchResults) => { this.dealerSearchResults = dealerSearchResults }}>
              <h5>Dealer List</h5>
              <ul id="dealer-list">
                {this._orderDealers === undefined ? <p>Please enter your address and search.</p> : dealerList}
              </ul>
            </div>
          <legend className="legend">
            <div style={{textAlign:"left"}}>
              <img src="https://s3.amazonaws.com/elite-website/images/elite-kure-pin-legend.png" alt="Elite Archery KURE Logo for Map Legend"/>KURE Available Here
            </div>
            <div style={{textAlign:"left"}}>
              <img src="https://s3.amazonaws.com/elite-website/images/elite-rezult-pin-legend.png" alt="Elite Archery REZULT Logo for Map Legend"/>REZULT Available Here
            </div>
          </legend>
          <LocatorMap
            center={this.state.center}
            zoom={this.state.zoom}
            onMapMounted={!this.state.mapMounted ? this.handleMapMounted : null}
            markers={this._orderDealers === undefined ? this.props.dealers : this._orderDealers }
            onMarkerClick={this.handleMarkerClick}
            clickedMarkerIndex={this.state.markerIndex}
            handleInfoClose={this.handleInfoClose}
            handleDealerClickFromMarker={this.handleDealerClickFromMarker}
            selectedDealer={this.props.selectedDealer}
          />
        </div>
        <div
          style={{
            marginTop: "2rem",
            position: "relative",
            paddingBottom: "56.25%" /* 16:9 */,
            paddingTop: 25,
            height: 0
          }}
        >
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%"
            }}
            width="420"
            height="315"
            src="https://www.youtube.com/embed/videoseries?list=PLeWZVpyFyGBAVXXn16XM2V2-lG-IGK2ov"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          />
        </div>
        <YoutubeVideo youtubeId="mgYLJsov2OA" youtubeDescription="At The Outdoor Group, we're proud to manufacture some of the best products in the industry, and as a small family-owned business, we're even more proud of the people who make it all happen. From building bows on card tables in a basement to where we are today. This incredible video from our friends at Lancaster Archery Supply shows the hard work that goes into every product that finds its way into archery and hunting shops around the world."/>
      </section>
    );
  }
}

const mapStateToProps = ({ dealers, selectDealer, selectedDealer }) => ({
  dealers,
  selectDealer,
  selectedDealer
});

export default connect(mapStateToProps, { fetchDealers: fetchDealersAction, selectDealer: selectDealerAction, selectedDealer: selectedDealerAction })(DealerMap)


/*

  const params = queryString.parse(this.props.location.search);
  const addressFromURL = params.address;
  const ritual30DealersFromURL = params.ritual_30_dealers

  {this.state.showShareSearch ? <ShareSearch closeShareModal={this.handleCloseShareModal} shareLink={this.state.shareLink !== null ? this.state.shareLink : null}/> : null}
  <legend className="ritual-legend"><img src="https://s3.amazonaws.com/elite-website/images/elite-ritual-30-pin-legend.png" alt="Elite Archery Ritual 30 Logo for Map Legend"/>Ritual 30 Available Here</legend>
  <div id="dealers-listing">
  <button className="share-search" onClick={this.handleCreateShareLink}>Share My Search</button>
    <label id="ritual-30-dealers">
      <input id="ritual-30-available" type="checkbox" ref={(rit30Checkbox) => { this.rit30Checkbox = rit30Checkbox }} onClick={()=> this.handleRit30CheckboxClick()} />
      <span>Only show dealers with the Ritual 30</span>
    </label>
    <StandaloneSearchBox
      bounds={this.state.bounds}
      onPlacesChanged={this.handlePlacesChanged}
    >
      <input
        id="search-box"
        ref={(searchBoxInput) => { this.searchBoxInput = searchBoxInput }}
        type="text"
        placeholder="Enter your address here"
      />
    </StandaloneSearchBox>
  <div className="dealer-list-wrappr">
    <ul id="dealer-list-left">
      {dealerList}
    </ul>
  </div>
</div>
this.props.dealers.length > 0 ?
  <LocatorPageMap
    ritual30DealersFromURL={ritual30DealersFromURL}
    addressFromURL={addressFromURL}
    dealers={this.props.dealers}
    selectDealer={this.props.selectDealer}
  />
  : <p>Please wait well we load your maps</p>


*/
