import React, { Component } from 'react';

export default class Stabilizer extends Component {
  constructor(props) {
    super(props);

    this.organizeStabilizersByModel = this.organizeStabilizersByModel.bind(this);
    this.showProductDetail = this.showProductDetail.bind(this);

    this.state = {
      activeStabilizer: null,
      stabilizers: this.props.stabilizers,
      stabilizer725: [],
      stabilizer11: []
    };

  }

  showProductDetail(stabilizer) {
    this.props.selectProduct({stabilizer: stabilizer});

    this.setState({
      activeStabilizer: {
        title: stabilizer.node.title,
        model: stabilizer.node.product.title
      }
    });
  }

  organizeStabilizersByModel(handle) {
      let stabilizer725 = [];
      let stabilizer11 = [];

      this.state.stabilizers.map( stabilizerArr => {
          stabilizerArr.map(stabilizer => {
            switch(stabilizer.node.product.title) {
              case 'Elite 7 1/4" Stabilizer':
                stabilizer725.includes(stabilizer) ? false : stabilizer725.push(stabilizer);
                this.setState({stabilizer725});
              break;

              case 'Elite 11" Stabilizer':
                stabilizer11.includes(stabilizer) ? false : stabilizer11.push(stabilizer);
                this.setState({stabilizer11});
              break;

              default:
              break;
            }
          });
      });
  }



  componentDidMount() {
    this.organizeStabilizersByModel('Elite 7 1/4" Stabilizer');
    this.organizeStabilizersByModel('Elite 7 11" Stabilizer');
  }

  componentDidUpdate(prevProps, nextProps) {

    if (prevProps.stabilizers !== this.props.stabilizers) {
      this.setState({
        stabilizers: this.props.stabilizers
      }, () => {
        this.organizeStabilizersByModel('Elite 7 1/4" Stabilizer');
        this.organizeStabilizersByModel('Elite 7 11" Stabilizer');
      })
    }

  }

  render() {

    // console.log('this.props.stabilizers: ', this.props.stabilizers);

    const isActive = (activeStabilizer) => {
      if ( (this.state.activeStabilizer.title === Object.keys(activeStabilizer)[0]) && (this.state.activeStabilizer.model === Object.values(activeStabilizer)[0]) ) {
        return 'active';
      } else {
        null;
      }
    };

    const loadStabilizers = (handle) => {
      return this.state[`stabilizer${handle.size}`].map( (stabilizer, i) => {
        if (stabilizer.node.availableForSale) return <li key={i} className={this.state.activeStabilizer !== null ? isActive({[stabilizer.node.title]: stabilizer.node.product.title}) : null}><img src={stabilizer.node.image.src} title={stabilizer.node.title} onClick={() => this.showProductDetail(stabilizer, stabilizer.node.title)} alt={`Elite Archery Stabilizer in ${stabilizer.node.title}`}/><span>{stabilizer.node.title}</span></li>;
      });
    };

    return (
      <div id="accessory-type">
        <h6>Stabilizers</h6>
        <div className="container">
            <div>
              <header>
                <h6>7 1/4" Stabilizer</h6>
              </header>
              <ul className="items">
                { loadStabilizers({size: 725, handle: 'Elite 7 1/4" Stabilizer'}) }
              </ul>
            </div>
            <div>
              <header>
                <h6>11" Stabilizer</h6>
              </header>
              <ul className="items">
                { loadStabilizers({size: 11, handle: 'Elite 11" Stabilizer'}) }
              </ul>
            </div>
        </div>
      </div>
    );
  }
}
