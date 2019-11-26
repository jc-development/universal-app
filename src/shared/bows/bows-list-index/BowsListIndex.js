import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { MiniModelsMenu } from './mini-models-menu/MiniModelsMenu';
import Profiles from './profiles/Profiles';
import BowsListCompare from '../bows-list-compare/BowsListCompare';

import './assets/css/bows-list-index.css';

export default class BowsListIndex extends Component {


  render() {

    return (
      <section id="bows-index-page">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Elite Archery - Makers of the Worlds Most Shootable Bows: KURE, REZULT, Valor, Ritual 35, Ritual 30, Ritual 33, Revol XL, Victory X, Echelon 37, Echelon 39</title>
        </Helmet>
        <BowsListCompare />
      </section>
    );
  }
}

// <Profiles /> <MiniModelsMenu />
