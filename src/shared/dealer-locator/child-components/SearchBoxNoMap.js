import React from 'react';

import _ from "lodash";
import { compose, withProps } from "recompose";
import { withScriptjs } from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";

export const SearchBoxNoMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC9ainGqIptxInuxLShRcVh5e1zECglW4M",
    loadingElement: <div style={{ height: `100%` }}><p>Please wait well we load your map</p></div>,
    containerElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
)(props =>
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        onFocus={props.fetchAllDealers}
        id="search-address"
        className="form-input"
        ref={props.searchBoxInput}
        type="text"
        placeholder="Your Address or Zip Code"
        autoComplete="off"
        onKeyPress={props.onKeyPress}
      />
    </StandaloneSearchBox>
);
