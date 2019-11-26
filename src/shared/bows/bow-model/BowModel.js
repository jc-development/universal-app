  import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as Routes from './../../app/routes';
import SubMenu from './child-components/bow-model-page/SubMenu';

import { checkWindowSize } from './assets/utilities/bow-family/check-window-size'

import './assets/css/bow-model.css';

import { connect } from 'react-redux';
import { fetchBowFamily as fetchBowFamilyAction, clearBowFamily as clearBowFamilyAction } from './assets/utilities/bow-family/bow-family-actions';

class BowModel extends Component {

  constructor() {
    super();

    this.handleResize = this.handleResize.bind(this);
    this.handleBowSubMenuPositionFixed = this.handleBowSubMenuPositionFixed.bind(this);
    this.bowSubMenuMounted = this.bowSubMenuMounted.bind(this);

    this.handleFaqDowloadLinkPositionFixed = this.handleFaqDowloadLinkPositionFixed.bind(this);
    this.faqDowloadLinkMounted = this.faqDowloadLinkMounted.bind(this);

    this.state = {
      isMobile: null,
      isBowSubmenuFixed: false,
      bowSubMenuHeight: null,
      isFaqDownloadLinkFixed: false,
      faqDownloadLinkCss: null
    }

    this.bowSubMenu
    this.faqDowloadLink

  }

  handleResize() {
    this.setState({
      isMobile: checkWindowSize()
    });
  }

  componentWillMount() {
    const bowFamilyProp = this.props.match.params.model;
    this.props.fetchBowFamily(bowFamilyProp);
  }

  componentDidMount() {
    this.setState({ isMobile: checkWindowSize() });
    window.addEventListener( 'resize', this.handleResize );
  }

  componentWillUnmount() {
    window.removeEventListener( 'resize', this.handleResize );
    window.removeEventListener("scroll", this.handleFaqDowloadLinkPositionFixed);
    this.props.clearBowFamily();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.model !== this.props.match.params.model) {
      const bowFamilyProp = this.props.match.params.model;
      this.props.clearBowFamily();
      this.props.fetchBowFamily(bowFamilyProp);
    }

    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.handleBowSubMenuPositionFixed()
    }
  }

  handleBowSubMenuPositionFixed() {
    if (this.props.location.pathname === `/elite-bows/${this.props.match.params.model}/buy`) {
      this.setState({
        isBowSubmenuFixed: true,
        bowSubMenuHeight: this.bowSubMenu.getBoundingClientRect().height
      })
    } else {
      this.setState({
        isBowSubmenuFixed: false,
        bowSubMenuHeight: null
      })
    }
  }

  bowSubMenuMounted(ref) {
    this.bowSubMenu = ref
    if(this.bowSubMenu) {
      this.handleBowSubMenuPositionFixed()
    }
  }

  handleFaqDowloadLinkPositionFixed() {
    if (this.bowSubMenu) {
      if (window.scrollY >= (this.bowSubMenu.getBoundingClientRect().height) && !this.state.isFaqDownloadLinkFixed) {
        this.setState({
          isFaqDownloadLinkFixed: true,
          faqDownloadLinkCss: {
            position: "fixed", 
            top: `calc(${this.bowSubMenu.offsetTop}px)`
          }
        })
      } else if (window.scrollY <= (this.bowSubMenu.offsetTop + 4) && this.state.isFaqDownloadLinkFixed) {
        this.setState({
          isFaqDownloadLinkFixed: false,
          faqDownloadLinkCss: null
        })
      }
    } else {
      this.setState({
        isFaqDownloadLinkFixed: false,
        faqDownloadLinkCss: null
      })
    }

  }

  faqDowloadLinkMounted(ref) {
    this.faqDowloadLink = ref
    if(this.faqDowloadLink) {
      window.addEventListener("scroll", this.handleFaqDowloadLinkPositionFixed);
    }
  }

  render() {

    const faqDownload = (bowFamilyName) => {
      if((bowFamilyName === "Kure" || bowFamilyName === "ReZult") && this.props.location.pathname !== `/elite-bows/${this.props.match.params.model}/buy`) {
        return <a className="download-faq" ref={this.faqDowloadLinkMounted} style={this.state.isFaqDownloadLinkFixed ? this.state.faqDownloadLinkCss : null} href="https://elite-website.s3.amazonaws.com/documents/bow-faq-sheets/kure_rezult_faq.pdf" target="_blank" rel="noopener noreferrer">Download {bowFamilyName} FAQ</a>
      } else {
        return null
      }
    }

    const checkURL = () => {
      if (this.props.match.url === `/elite-bows/${this.props.match.params.model}`
          && this.props.location.pathname !== `/elite-bows/${this.props.match.params.model}/tech-specs`
          && this.props.location.pathname !== `/elite-bows/${this.props.match.params.model}/buy`
          && this.props.location.pathname !== `/elite-bows/kure/design`
          && this.props.location.pathname !== `/elite-bows/rezult/design`
         ) { // need to redirect to overview page if they come to elite-bows/bowFamilyName
        return <Redirect to={`/elite-bows/${this.props.match.params.model}/overview`} component={Routes.BowModelOverview} />;
      }
    };

    // temp code -----------------------------------------------------------------------------------------------------------------------
                if (this.props.bowFamily === null) {
                  return (<section id="bow-model" className="main-content-section" ref={bowModelWrapper => this.bowModelWrapper = bowModelWrapper}>
                  { checkURL() }
                    <SubMenu
                      handleClick={this.handleClick}
                      url={this.props.match.url}
                      modelFamily={this.props.match.params.model}
                      isMobile={this.state.isMobile}
                      locationURL={this.props.location.pathname}
                      refBowSubMenu={this.bowSubMenuMounted}
                      isBowSubmenuFixed={this.state.isBowSubmenuFixed}
                    />
                    <Switch>
                      <Route path='/elite-bows/:model(rezult|kure)/design' render={() => <Routes.BowDesign {...this.props} />} />
                      <Route path='/elite-bows/:model(valor|ritual|victory|rezult|kure|revol|echelon)/overview' render={() => <Routes.BowModelOverview {...this.props} />} />
                      <Route path='/elite-bows/:model(valor|ritual|victory|rezult|kure|revol|echelon)/tech-specs' render={() => <Routes.TechSpecs {...this.props} />} />
                      <Route path='/elite-bows/:model(valor|ritual|victory|rezult|kure|revol|echelon)/buy' render={() => <Routes.BuyBow {...this.props} isBowSubmenuFixed={this.state.isBowSubmenuFixed} bowSubMenuHeight={this.state.bowSubMenuHeight} />} />
                    </Switch>
                  </section>);
                }
    // end temp code -----------------------------------------------------------------------------------------------------------------------

    if (this.props.bowFamily.bows[0] && this.props.bowFamily.bows[0] !== null) {
      return (
        <section id="bow-model" className="main-content-section" ref={bowModelWrapper => this.bowModelWrapper = bowModelWrapper}>
        { checkURL() }
          <SubMenu
            handleClick={this.handleClick}
            url={this.props.match.url}
            modelFamily={this.props.match.params.model}
            isMobile={this.state.isMobile}
            locationURL={this.props.location.pathname}
            refBowSubMenu={this.bowSubMenuMounted}
            isBowSubmenuFixed={this.state.isBowSubmenuFixed}
          />
          { faqDownload(this.props.bowFamily.name) }
          <Switch>
            <Route path='/elite-bows/:model(rezult|kure)/design' render={() => <Routes.BowDesign {...this.props} />} />
            <Route path='/elite-bows/:model(valor|ritual|victory|rezult|kure|revol|echelon)/overview' render={() => <Routes.BowModelOverview {...this.props} />} />
            <Route path='/elite-bows/:model(valor|ritual|victory|rezult|kure|revol|echelon)/tech-specs' render={() => <Routes.TechSpecs {...this.props} />} />
            <Route path='/elite-bows/:model(valor|ritual|victory|rezult|kure|revol|echelon)/buy' render={() => <Routes.BuyBow {...this.props} isBowSubmenuFixed={this.state.isBowSubmenuFixed} bowSubMenuHeight={this.state.bowSubMenuHeight} />} />
          </Switch>
        </section>
      );
    } else {
      return null
    }
  }
}

BowModel.defaultProps = {
  bowFamily: {}
};

const mapStateToProps = ({ bowFamily }) => ({
  bowFamily
});

export default connect(mapStateToProps, { fetchBowFamily: fetchBowFamilyAction, clearBowFamily: clearBowFamilyAction })(BowModel)
