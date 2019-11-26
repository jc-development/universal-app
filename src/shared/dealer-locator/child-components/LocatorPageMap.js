import React, { Component } from 'react';

import { Dealer } from "./Dealer"

import './../assets/css/dealer-locator.css';

import _filter from 'lodash/filter';

import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";

import TweenMax from 'gsap/TweenMax';
import scrollTo from 'gsap/ScrollToPlugin';

import axios from 'axios';

import {ShareSearch} from './ShareSearch'

class LocatorPageMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dealers: [],
      bounds: null,
      center: {
        lat: 43.064049,
        lng: -77.675990
      },
      zoom: 8,
      markerIndex: 10000,
      orderedDealers: [],
      shareLink: null,
      showShareSearch: false,
    };

    this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleDealerClick = this.handleDealerClick.bind(this);
    this.handleInfoClose = this.handleInfoClose.bind(this);
    this.handleRit30CheckboxClick = this.handleRit30CheckboxClick.bind(this);

    this.handleGeoLocation = this.handleGeoLocation.bind(this);
    this.handleLocationError = this.handleLocationError.bind(this);
    this.handleQueryParamsFromURL = this.handleQueryParamsFromURL.bind(this);
    this.handleCreateShareLink = this.handleCreateShareLink.bind(this);

    this.handleCloseShareModal = this.handleCloseShareModal.bind(this);

    this.google = null;
    this.geocoder = null;

  }

  componentDidMount() {
    this.geocoder = new window.google.maps.Geocoder;
    if(!this.props.addressFromURL) {
      this.handleGeoLocation();
    }
    this.handleQueryParamsFromURL();
  }

  componentWillMount() {
    this.google = null;
    this.geocoder = null;
  }

  handlePlacesChanged() {
    const address = this.searchBoxInput.value;
    if (this.geocoder) {
      let that = this
      this.geocoder.geocode({'address': address}, function (results, status) {
        if (status == "OK") {
          if (status != "ZERO_RESULTS") {
            const originLatLng = results[0].geometry.location;
            that.distanceFromOrigin(originLatLng)
            that.setState({
              center: originLatLng,
              zoom: 9,
            });
          } else {
            alert("No results found while geocoding!");
          }
        } else {
          alert("No Dealers were found using your location!");
        }
      })
    }
  }

  distanceFromOrigin(originLatLng) {
    let that = this
    let dealersWithDistance = this.state.dealers.map(function (dealer, i) {
      let dealerLatLng = new window.google.maps.LatLng(dealer.lat,dealer.lng)
      let dealerObject =
        {
          name: dealer.name,
          address: dealer.address,
          city: dealer.city,
          state: dealer.state,
          postal: dealer.postal,
          country: dealer.country,
          phone: dealer.phone,
          lat: dealer.lat,
          lng: dealer.lng,
          id: i,
          distance: window.google.maps.geometry.spherical.computeDistanceBetween(originLatLng, dealerLatLng) / 1609.344,
          ritual_30_available: dealer.ritual_30_available
        }
      return dealerObject
    })

    const orderedDealers = _.orderBy(dealersWithDistance, function (dealer) {
      return parseFloat(dealer.distance)
    }, 'asc');

    this.setState({orderedDealers: orderedDealers})
  }

  handleMarkerClick (marker, index) {
    this.setState({ markerIndex: index })
  }

  handleInfoClose() {
    this.setState({ markerIndex: 10000, zoom: 8 })
  }

  handleDealerClick(dealer) {
    const selectDealerInfo = {
      dealerName: dealer.dealerName,
      dealerAddress: dealer.dealerAddress,
      dealerCity: dealer.dealerCity,
      dealerState: dealer.dealerState,
      dealerZip: dealer.dealerPostal,
      dealerPhone: dealer.dealerPhone,
      dealerEmail: dealer.dealerEmail
    };

    this.props.selectDealer(selectDealerInfo);

    this.setState({
      center: {
        lat: parseFloat(dealer.dealerLat),
        lng: parseFloat(dealer.dealerLong)
      },
      zoom: 11,
    }, () => {
      this.handleMarkerClick(dealer, dealer.dealerId);
    });

    const mapElement = this.map.getDiv();
    const mapPosition = mapElement.getBoundingClientRect();
    if(mapPosition.top <= 99) {
        TweenMax.to(window, 0.5, {scrollTo:{y:100, autoKill:false}})
    }
  }

  handleRit30CheckboxClick() {
    let origin
    if(typeof this.state.center.lat === "function") {
      origin = this.state.center
    } else {
      origin = new window.google.maps.LatLng(this.state.center.lat,this.state.center.lng)
    }
    if (this.rit30Checkbox.checked) {
      this.setState({dealers:  _filter(this.props.dealers, {ritual_30_available: "1"})}, ()=> { this.distanceFromOrigin(origin)})
    } else {
      this.setState({dealers: this.props.dealers}, ()=> { this.distanceFromOrigin(origin)})
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
            }
          }, () => {
            if (this.props.ritual30DealersFromURL === 'true') {
              this.rit30Checkbox.checked = true;
              this.handleRit30CheckboxClick()
            } else {
              this.handleRit30CheckboxClick()
            }
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

  // handle component load of dealer locator including query params
  handleQueryParamsFromURL() {
    if(this.props.addressFromURL) {
      this.searchBoxInput.value = this.props.addressFromURL
      if(this.props.ritual30DealersFromURL === 'true') {
        this.rit30Checkbox.checked = true;
        this.setState({dealers:  _filter(this.props.dealers, {ritual_30_available: "1"})}, ()=> { this.handlePlacesChanged()})
      } else {
        this.setState({dealers:  this.props.dealers}, ()=> { this.handlePlacesChanged()})
      }
    } else {
      const origin = new window.google.maps.LatLng(this.state.center.lat,this.state.center.lng)
      if(this.props.ritual30DealersFromURL === 'true') {
        this.rit30Checkbox.checked = true;
        this.setState({dealers:  _filter(this.props.dealers, {ritual_30_available: "1"})}, ()=> { this.distanceFromOrigin(origin)})
      } else {
        this.setState({dealers:  this.props.dealers}, ()=> { this.distanceFromOrigin(origin)})
      }
    }
  }

  // handle creation of shortened url from bitly
  async handleCreateShareLink() {

    let locatorURL
    if (this.searchBoxInput.value && this.rit30Checkbox.checked) {
      locatorURL = `ritual_30_dealers=${this.rit30Checkbox.checked}&address=${this.searchBoxInput.value}`
    } else if (this.searchBoxInput.value && !this.rit30Checkbox.checked) {
      locatorURL = `address=${this.searchBoxInput.value}`
    }

    if (locatorURL) {
      const response = await axios.post('/api/shorten-url', locatorURL);
      this.setState({
        showShareSearch:true,
        shareLink: response.data.link
      })
    } else {
      alert("Please enter an address and search for dealers first")
    }

  }

  handleCloseShareModal() {
    this.setState({
      showShareSearch:false,
      shareLink: null
    })
  }


  render() {
    let dealerList
    if (this.state.orderedDealers.length !== 0) {
      dealerList = this.state.orderedDealers.map((dealer, i) => {
        if(i < 51) {
          return(
            <Dealer
              dealerName={dealer.name}
              dealerAddress={dealer.address}
              dealerCity={dealer.city}
              dealerState={dealer.state}
              dealerPostal={dealer.postal}
              dealerPhone={dealer.phone}
              dealerDistance={dealer.distance.toFixed(1)}
              dealerLat={dealer.lat}
              dealerLong={dealer.lng}
              handleDealerClick={this.handleDealerClick}
              dealerId={dealer.id}
              dealerRit30={dealer.ritual_30_available}
            />
          )
        }
      })
    }


    return (
          <GoogleMap
            ref={(map) => { this.map = map }}
            defaultOptions={{ disableDefaultUI: true }}
            zoom={this.state.zoom}
            center={this.state.center}
            // onBoundsChanged={this._handleBoundsChanged}
            markers={this.state.dealers}
          >
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
            <MarkerClusterer
              averageCenter
              enableRetinaIcons
              gridSize={60}
              defaultMaxZoom={9}>
              {this.state.dealers.map((marker, index) => (
                <Marker
                  noRedraw={true}
                  onClick={() => this.handleMarkerClick(marker, index)}
                  key={marker.photo_id}
                  position={{lat: marker.latitude, lng: marker.longitude}}
                  position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
                  icon={marker.ritual_30_available === "1" ? "https://s3.amazonaws.com/elite-website/images/elite-ritual-30-pin.png" : "https://s3.amazonaws.com/elite-website/images/elite-standard.png"}
                >
                  {this.state.markerIndex === index ?
                    (<InfoWindow onCloseClick={this.handleInfoClose}>
                      <div className="info-window">
                        <p><strong>{marker.name}</strong></p>
                        <p>
                          {marker.address}
                          <br></br>
                          {marker.city === "" || marker.city === null ? '' : marker.city }
                          {marker.state === "" || marker.state === null ? '' : ', ' + marker.state }
                          {marker.postal === "" || marker.postal === null ? '' : ' ' + marker.postal }
                        </p>
                        <p>{marker.phone}</p>
                      </div>
                    </InfoWindow>
                  ) : null}
                </Marker>
              ))}
            </MarkerClusterer>
          </GoogleMap>
    );
  }
}

export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC9ainGqIptxInuxLShRcVh5e1zECglW4M",
    loadingElement: <div style={{ height: `100%` }}><p>Please wait well we load your maps</p></div>,
    containerElement: <div className="map-container" />,
    mapElement: <div id="find-a-dealer-map"/>,
  }),
  withScriptjs,
  withGoogleMap
)(LocatorPageMap)
