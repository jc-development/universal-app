import React from 'react';

import _ from "lodash";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

const markerOnMap = (props, marker, index, markerIconURL, offset) => {
  const iconImage = {
    ...({url: markerIconURL ? markerIconURL : "https://s3.amazonaws.com/elite-website/images/elite-standard.png"}),
    scaledSize: new google.maps.Size(50, 50)
  }
  return(<Marker
    noRedraw={true}
    onClick={() => props.onMarkerClick(marker, marker.id)}
    key={marker.id}
    title={marker.name}
    position={ offset ? { lat: parseFloat(marker.lat) + offset, lng: parseFloat(marker.lng) } : { lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
    icon={iconImage}
  >
    {!offset && props.clickedMarkerIndex === marker.id ?
      (<InfoWindow onCloseClick={props.handleInfoClose}>
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
          {marker.distance !== undefined ? <p>{marker.distance.toFixed(1)} Miles</p> : ''}
          {
            props.selectedDealer.dealerName !==  "N/A" ?
              props.selectedDealer.dealerId !== undefined ?
                props.selectedDealer.dealerId === marker.id ? <button onClick={() => props.handleDealerClickFromMarker(marker)}>Selected Dealer</button>
                : <button onClick={() => props.handleDealerClickFromMarker(marker)}>Select Dealer</button>
              : <button onClick={() => props.handleDealerClickFromMarker(marker)}>Select Dealer</button>
            : <button onClick={() => props.handleDealerClickFromMarker(marker)}>Select Dealer</button>
          }
        </div>
      </InfoWindow>
    ) : null}
  </Marker>)
}
export const LocatorMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC9ainGqIptxInuxLShRcVh5e1zECglW4M",
    loadingElement: <div style={{ height: `100%` }}><p>Please wait well we load your maps</p></div>,
    containerElement: <div className="map-container" />,
    mapElement: <div id="find-a-dealer-map"/>,
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
    defaultOptions={{ disableDefaultUI: true, zoomControl: false, scaleControl: false, maxZoom: 11 }}
    onBoundsChanged={props.onBoundsChanged}
    markers={props.markers}
  >
    <MarkerClusterer
      ref={props.onMarkerClustererMounted}
      averageCenter
      enableRetinaIcons
      gridSize={60}
      defaultMaxZoom={9}>
      {props.markers.map((marker, index) => {
        let kureMarker, rezultMarker, originalMarker
        if(marker.kure_available === "1" || marker.rezult_available === "1") {
          if(marker.kure_available === "1") {
            const markerIconURL = "https://s3.amazonaws.com/elite-website/images/elite-kure-pin-legend.png"
            kureMarker = markerOnMap(props, marker, index, markerIconURL)
          }
          if(marker.rezult_available === "1") {
            const markerIconURL = "https://s3.amazonaws.com/elite-website/images/elite-rezult-pin-legend.png"
            const offset = +0.015
            rezultMarker = markerOnMap(props, marker, index, markerIconURL, offset)
          }
        } else {
          originalMarker = markerOnMap(props, marker, index)
        }
        return (
          <React.Fragment>
            {kureMarker ? kureMarker : ""}
            {rezultMarker ? rezultMarker : ""}
            {originalMarker ? originalMarker : ""}
          </React.Fragment>
        )
      })}
    </MarkerClusterer>
  </GoogleMap>
  </React.Fragment>
);
