import React, { Component } from 'react';
import { IndexBow } from './child-components/IndexBow';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import MonthlyPayment from './../../klarna/MonthlyPayment';

import { connect } from 'react-redux';
import { fetchBows as fetchBowsAction } from './actions';
import './assets/css/bows-list-compare.css';

import _orderBy from 'lodash/orderBy';

class BowsListCompare extends Component {

  componentWillMount() {
    if (this.props.bows.length < 1) this.props.fetchBows();
  }

  render() {

    const klarnaReady = () => {
          return (
            <div className="klarna-heading-wrapper">
             <MonthlyPayment id="stuff" amount={`${1500}00`} />
             <p>*Based on the retail price of $1500 and the 24 month term.</p>
           </div>
          )
    }

    const relPos = {
      position: 'relative'
    };

    const loadingText = {
      color: '#fff',
      textShadow: '1px 1px 1px #000',
      position: 'absolute',
      top: '20%',
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: '4rem'
    }
    const getBowNodes = () => {
      const bows = _orderBy(this.props.bows, (bow)=> bow.placement);
      const bows2020 = bows.filter(bow => bow.modelYear === "2020");
      const bows2019 = bows.filter(bow => bow.modelYear === "2019");
      const bows2018 = bows.filter(bow => bow.modelYear === "2018");

        const bowsNodes2020 = bows2020.map( (bow) => {
          return (
            <IndexBow
              key={bow.id}
              bowImage={bow.bowListImagePath}
              name={bow.name}
              msrp={bow.msrp}
              urlModel={bow.modelNameUrl}
              axleToAxle={bow.techSpecs.axleToAxle}
              speedRating={bow.techSpecs.speedRating}
              useTypeIcons={bow.techSpecs.useTypes}
            />
          )
        });

        const bowsNodes2019 = bows2019.map( (bow) => {
          return (
            <IndexBow
              key={bow.id}
              bowImage={bow.bowListImagePath}
              name={bow.name}
              msrp={bow.msrp}
              urlModel={bow.modelNameUrl}
              axleToAxle={bow.techSpecs.axleToAxle}
              speedRating={bow.techSpecs.speedRating}
              useTypeIcons={bow.techSpecs.useTypes}
            />
          )
        });

        const bowsNodes2018 = bows2018.map( (bow) => {
          return (
            <IndexBow
              key={bow.id}
              bowImage={bow.bowListImagePath}
              name={bow.name}
              msrp={bow.msrp}
              urlModel={bow.modelNameUrl}
              axleToAxle={bow.techSpecs.axleToAxle}
              speedRating={bow.techSpecs.speedRating}
              useTypeIcons={bow.techSpecs.useTypes}
            />
          )
        });

        return (
          <React.Fragment>
            {bows2020.length < 1 ? null : 
              <React.Fragment>
                <h2 className="bow-lineup-title">2020 LINEUP</h2>
                <div className="bow-list-row">{bowsNodes2020}</div>
              </React.Fragment>
            }
            {bows2019.length < 1 ? null : 
              <React.Fragment>
                <h2 className="bow-lineup-title">2019 LINEUP</h2>
                <div className="bow-list-row">{bowsNodes2019}</div>
              </React.Fragment>
            }
            {bows2018.length < 1 ? null : 
              <React.Fragment>
                <h2 className="bow-lineup-title">2018 LINEUP</h2>
                <div className="bow-list-row">{bowsNodes2018}</div>
              </React.Fragment>
            }
          </React.Fragment>
        )

    }

    const showIt = {
      width: "210px",
      height: "80px"
    };

    const freeBowCase = {
      backgroundColor: 'black',
      color: 'white',
      fontSize: '5rem'
    };

    const spanStyle = {
      fontSize: '3rem'
    }

    const bowLineupStyle = {
      margin: "1rem 4rem",
      borderBottom: "2px solid #000"
    }

    return (
      <section id="bows-list-compare">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Elite Archery - Makers of the Worlds Most Shootable Bows: KURE, REZULT, Valor, Ritual 35, Ritual 30, Ritual 33, Revol XL, Victory X, Echelon 37, Echelon 39</title>
        </Helmet>
        <div className="center-content width-85 intro-content">
          <img className="elite-logo" src="https://s3.amazonaws.com/elite-website/v2/images/elite-logo-black.png" alt="Elite Archery logo"/>
          <h1>THE ELITE BOW SELECTION</h1>
          <p>Meaningful innovation drives everything we do at Elite Archery. Our bows are built in America by extremely skilled individuals who have a vested interest in the final product - because they use them too. From engineering to production and assembly, each bow is precision-manufactured in an ISO9001 facility. We invest in state-of-the-art technology not only in our processes, but in our equipment. PALS Limb Pockets. Exclusive Riser Cages. LIMBSAVER Technology. Two-Track Cam Systems. We spare no detail, and the result is the world’s most shootable bow.</p>
          { klarnaReady() }
          <div className="purchase-online">
            <h2>PURCHASE AN ELITE BOW ONLINE</h2>
            <p>GET THE BOW YOU ALWAYS WANTED</p>
            <dl>
              <dt>TO PURCHASE A BOW</dt>
              <dd>1. SELECT THE BOW MODEL BELOW</dd>
              <dd>2. CONFIGURE THE BOW TO YOUR SPECS</dd>
              <dd>3. SELECT A DEALER FOR SHIPMENT</dd>
            </dl>
          </div>

        </div>
        {getBowNodes()}
      </section>
    );
  }
}


BowsListCompare.defaultProps = {
  bows: []
};

const mapStateToProps = ({ bows }) => ({
  bows
});

export default connect(mapStateToProps, { fetchBows: fetchBowsAction })(BowsListCompare);
