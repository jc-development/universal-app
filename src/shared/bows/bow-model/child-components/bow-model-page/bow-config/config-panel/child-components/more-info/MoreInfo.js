import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchBowFamily as fetchBowFamilyAction } from '../../../../../../assets/utilities/bow-family/bow-family-actions';

import OverviewHeader from '../../../../OverviewHeader';
import Performance from '../../../../Performance';
import AboutCam from '../../../../AboutCam';

class MoreInfo extends Component {

  componentWillMount() {
    this.props.fetchBowFamily(this.props.match.params.model);
  }

  render() {

    // console.log('this.props moreinfo: ', this.props);

    const loadNodes = () => {
      if (this.props.bowFamily.overview) {
        return (
          <div id="model-reminder">
            <OverviewHeader
              overview={this.props.bowFamily.overview}
              headerVideo={this.props.bowFamily.headerVideo}
            />
            <Performance
              performance={this.props.bowFamily.performance}
              seriesSlider={this.props.bowFamily.seriesSlider}
            />
            <AboutCam
              aboutCam={this.props.bowFamily.aboutCam}
            />
          </div>
        );
      } else {
        return null;
      }
    };

    return loadNodes();
  }
 }

const mapStateToProps = ({ bowFamily }) => ({ bowFamily });

export default connect(mapStateToProps, { fetchBowFamily: fetchBowFamilyAction })(MoreInfo);
