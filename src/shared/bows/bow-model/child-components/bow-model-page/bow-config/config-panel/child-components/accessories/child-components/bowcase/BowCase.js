import React, { Component } from 'react';

export default class BowCase extends Component {

  constructor() {
    super();

    this.showProductDetail = this.showProductDetail.bind(this);

    this.state = {
      title: null
    };

  }

  showProductDetail(bowCase, title) {
    this.props.selectProduct({bowCase: bowCase});
    this.setState({title});
  }

  render() {

    // console.log('this.props.bowCases: ', this.props.bowCases);

    const isActive = (title) => {
      if (this.state.title === title) {
        return 'active';
      } else {
        null;
      }
    }

    const loadBowCaseNodes = () => {
      return this.props.bowCases.map( bowCase => {
        return bowCase.map( (bCase, i) => {
          // console.log('bCase.node: ', bCase.node);
          return <li key={i} className={isActive(bCase.node.product.title)}><img src={ bCase.node.image.src } title={ bCase.node.product.title} alt={ bCase.node.product.title } onClick={() => this.showProductDetail(bCase, bCase.node.product.title)} /><span>{bCase.node.product.title}</span></li>;
        });
      });
    }

    return (
      <div id="accessory-type">
        <h6>Bow Cases</h6>
          <div className="container">
            <div>
              <ul className="items">
                { loadBowCaseNodes() }
              </ul>
            </div>
          </div>
      </div>
    );
  }
}
