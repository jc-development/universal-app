import React, { Component } from 'react';
import { Dealer } from "./child-components/Dealer";
import { connect } from 'react-redux';
import { fetchDealers as fetchDealersAction } from '../../../../../../../../../dealer-locator/actions';
import {
  selectDealer as selectDealerAction,
  selectedDealer as selectedDealerAction
} from './actions';

import './assets/css/select-dealer.css';

import { SelectDealerMap } from './child-components/SelectDealerMap';

import TweenMax from 'gsap/TweenMax';
import TimelineMax from 'gsap/TimelineMax';

class SelectDealer extends Component {

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
    };

    this.fetchAllDealers = this.fetchAllDealers.bind(this);
    this.handleMapMounted = this.handleMapMounted.bind(this);
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
    this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
    this.handleDealerClick = this.handleDealerClick.bind(this);
    this.openDealerModal = this.openDealerModal.bind(this);
    this.selectDealerInterface = this.selectDealerInterface.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleInfoClose = this.handleInfoClose.bind(this);
    this.handleDealerClickFromMarker = this.handleDealerClickFromMarker.bind(this);
    this.handleToggleMapDealerList = this.handleToggleMapDealerList.bind(this);

    this.selectDealerAndAddBow = this.selectDealerAndAddBow.bind(this);

    this.searchBoxInput;
    this.dealerSearchResults;
    this.animateList;
  }

  componentWillMount() {
    this.fetchAllDealers()
  }

  componentDidMount() {
    this.animateList = new TimelineMax({paused: true});
    this.animateList.to(this.dealerSearchResults, 0.5, {x: 0, force3D: true});
    // console.log('search-input on component mount for select dealer: ', this.searchBoxInput)
  }

  componentWillUnmount() {
    this.searchBoxInput = null;
    this.dealerSearchResults = null;
    this.animateList = null;
  }

  fetchAllDealers() {
    if (this.props.dealers.length < 1) this.props.fetchDealers();
  }

  handleMapMounted() {
    // console.log('search-input on map mount for select dealer: ', this.searchBoxInput)
    this.geocoder = new google.maps.Geocoder;
    const googleAutoComplete = new google.maps.places.Autocomplete(this.searchBoxInput);
    google.maps.event.addListener(googleAutoComplete, 'place_changed', () => {this.handlePlacesChanged()});

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
            if(this.state.toggleMap) {
              this.setState({
                center: originLatLng,
                zoom: 9,
                toggleMap: false
              }, () => {
                this.animateList.play()
              });
            } else {
              this.setState({
                center: originLatLng,
                zoom: 9,
              });
            }

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
          distance: window.google.maps.geometry.spherical.computeDistanceBetween(originLatLng, dealerLatLng) / 1609.344
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
    this.selectDealerAndAddBow(selectDealerInfo, this.props.addBow())
    // reset or close drop down after selecting dealer.
    // this.setState({
    //   center: {
    //     lat: parseFloat(dealer.dealerLat),
    //     lng: parseFloat(dealer.dealerLong)
    //   },
    //   zoom: 11,
    // }, () => {
    //   this.handleMarkerClick(dealer, dealer.dealerId);
    // });
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

  selectDealerAndAddBow(dealerInfo, callback) {
    this.props.selectDealer(dealerInfo);
    callback;
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
    this.selectDealerAndAddBow(selectDealerInfo, this.props.addBow())
    // this.props.selectDealer(selectDealerInfo);
    // this.props.addBow();
  }

  handleToggleMapDealerList(event) {
    if(event) {
      event.preventDefault();
    }
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

  selectDealerInterface() {
    if (this.props.selectDealer) {
      const display = {
        display: 'block',
        visibility: 'visible',
        zIndex: 1000
      };

      const hidden = {
        display: 'none',
        visibility: 'hidden',
        zIndex: 0
      };

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
                dealerEmail={dealer.email}
                dealerLat={dealer.lat}
                dealerLong={dealer.lng}
                dealerId={dealer.id}
              />
            )
          }
        })
      }

      const handleTitleClass = () => {
        if (this.props.fifthSection.position === "fixed") {
          return "section-title-fixed"
        } else if (this.props.fifthSection.position === "absolute") {
          return "section-title-absolute"
        } else {
          return null
        }
      }

      const handleTitleStyle = () => {
        if (this.props.fifthSection.position === "fixed") {
          return this.props.fifthSection.sectionTitleTop
        } else {
          return null
        }
      }
        return (
          <div style={this.props.fifthSection.position !== null ? this.props.fifthSection.sectionPadding : null}>
            <div id="search-input-wrapper">
              <article>
                <header><h5 className={handleTitleClass()} style={handleTitleStyle()}>Select An Official Elite Dealer to receive your customized bow</h5></header>
                <p>Our Dealers receive your factory-built bow, and assist with set up and more. Experience the World's Most Shootable Bow today!</p>
              </article>
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
            </div>
            <div id="map-content-wrapper">
              <button className="toggle-map-dealer-list" onClick={this.handleToggleMapDealerList}>{this.state.toggleMap ? 'View Dealer List' : 'Hide Dealer List' }</button>
                <div className="dealer-search-results" ref={(dealerSearchResults) => { this.dealerSearchResults = dealerSearchResults }}>
                  <h5>Dealer List</h5>
                  <ul id="dealer-list">
                    {this._orderDealers === undefined ? <p>Please enter your address and hit the GO button above to view dealers.</p> : dealerList}
                  </ul>
                </div>
              <SelectDealerMap
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
          </div>
        )
      }

  }

  render() {
    return (
        <div id="select-bow-dealer">
          {this.props.selectDealerTitle !== undefined ? <h4>{this.props.selectDealerTitle}</h4> : null}
          {this.selectDealerInterface()}
        </div>
    );
  }
}

SelectDealer.defaultProps = {
  selectedDealer: {
    dealerName: "N/A",
    dealerAddress: "N/A",
    dealerPhone: "N/A",
    dealerEmail: "N/A"
  }
};

const mapStateToProps = ({ dealers, selectDealer, selectedDealer }) => ({
  dealers,
  selectDealer,
  selectedDealer
});

export default connect(mapStateToProps, { fetchDealers: fetchDealersAction, selectDealer: selectDealerAction, selectedDealer: selectedDealerAction })(SelectDealer);
