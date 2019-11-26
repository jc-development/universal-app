import React from 'react';

import _ from "lodash";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

const checkMarker = (props, marker) => {
  if (props.selectedDealer.dealerName !==  "N/A" && props.selectedDealer.dealerId && props.selectedDealer.dealerId === marker.id) {
    return <button onClick={() => props.handleDealerClickFromMarker(marker)}>Selected Dealer and Checkout</button>;
  } else {
    return <button onClick={() => props.handleDealerClickFromMarker(marker)}>Select Dealer and Checkout</button>;
  }
};

export const SelectDealerMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC9ainGqIptxInuxLShRcVh5e1zECglW4M",
    loadingElement: <div style={{ height: `100%` }}><p>Please wait well we load your maps</p></div>,
    containerElement: <div className="select-map-search-container" />,
    mapElement: <div className="map" />,
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <React.Fragment>
  <GoogleMap
    ref={props.onMapMounted}
    zoom={props.zoom}
    center={props.center}
    defaultZoom={6}
    defaultCenter={{ lat: 43.064049, lng: -77.675990 }}
    defaultOptions={{ disableDefaultUI: true, zoomControl: false, scaleControl: false }}
    onBoundsChanged={props.onBoundsChanged}
    markers={props.markers}
  >

    <MarkerClusterer
      ref={props.onMarkerClustererMounted}
      averageCenter
      enableRetinaIcons
      gridSize={60}
      defaultMaxZoom={9}>
      {props.markers.map((marker, index) => (
        <Marker
          noRedraw={true}
          onClick={() => props.onMarkerClick(marker, marker.id)}
          key={marker.id}
          title={marker.name}
          position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
          icon="https://s3.amazonaws.com/elite-website/images/elite-standard.png">
          {props.clickedMarkerIndex === marker.id ?
            (<InfoWindow onCloseClick={props.handleInfoClose}>
              <div className="info-window">
                { checkMarker(props, marker) }
                <p><strong>{marker.name}</strong></p>
                <p>
                  {marker.address}
                  <br></br>
                  {marker.city === "" || marker.city === null ? '' : marker.city }
                  {marker.state === "" || marker.state === null ? '' : ', ' + marker.state }
                  {marker.postal === "" || marker.postal === null ? '' : ' ' + marker.postal }
                </p>
                <p>{marker.phone}</p>
                {marker.distance !== undefined ? <p>{marker.distance.toFixed(1)} Miles</p> : ''}
              </div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </MarkerClusterer>
  </GoogleMap>
  </React.Fragment>
);
