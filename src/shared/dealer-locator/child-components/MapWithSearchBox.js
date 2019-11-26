import React from 'react';

import _ from "lodash";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
// import MapMarker from "./MapMarker";

export const MapWithSearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC9ainGqIptxInuxLShRcVh5e1zECglW4M",
    loadingElement: <div style={{ height: `100%` }}><p>Please wait well we load your maps</p></div>,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props =>
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
    >
      {props.markers.map((marker, index) => (
        <Marker
          noRedraw={true}
          onClick={() => props.onMarkerClick(marker, index)}
          key={marker.id}
          title={marker.name}
          position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
          icon="https://s3.amazonaws.com/elite-website/images/elite-standard.png">
          {props.clickedMarkerIndex === index ?
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
              </div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </MarkerClusterer>

    {/* <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        id="search-box"
        ref={props.searchBoxInput}
        type="text"
        placeholder="Enter your address here"
      />
    </SearchBox> */}
  </GoogleMap>
);
