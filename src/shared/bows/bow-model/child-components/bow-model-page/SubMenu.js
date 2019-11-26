import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './assets/css/sub-menu.css';

export default class SubMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      active: null
    };

    this.handleActive = this.handleActive.bind(this);
  }

  componentDidMount() {
    this.handleActive(this.props.locationURL);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.locationURL !== nextProps.locationURL) {
        this.handleActive(nextProps.locationURL)
    }
  }

  handleActive(locationURL) {
    const urlArray = locationURL.split("/");
    const urlLast = urlArray.slice(-1)[0];
    this.setState({active: urlLast})
  }


  render() {

    const styleActive = {
      padding: '3.5rem 1rem',
      color: '#fff',
      backgroundColor: '#337ab7',
    };

    const checkIfHasSetTech = (modelFamily) => (modelFamily === "rezult" || modelFamily === "kure") ? <li><Link style={this.state.active === 'design' ? styleActive: null} to={`${this.props.url}/design`}>Design</Link></li> : null;

    return (
      <div id="bow-sub-menu" ref={this.props.refBowSubMenu} style={this.props.isBowSubmenuFixed ? {position: "fixed", zIndex: 5} : null}>
        <h5>{`${this.props.modelFamily}`} series</h5>
        <nav>
          <ul>
            { checkIfHasSetTech(this.props.modelFamily) }
            <li><Link style={this.state.active === 'overview' ? styleActive: null} to={`${this.props.url}/overview`}>Overview</Link></li>
            <li><Link style={this.state.active === 'tech-specs' ? styleActive: null} to={`${this.props.url}/tech-specs`}>Tech Specs</Link></li>
            <li><Link style={this.state.active === 'buy' ? styleActive: null} to={`${this.props.url}/buy`}>Bow Builder</Link></li>
          </ul>
        </nav>
      </div>
    );

  }
}
