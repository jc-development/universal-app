import React, { Component } from 'react';

export default class Arrow extends Component {
  constructor() {
    super();

    this.showProductDetail = this.showProductDetail.bind(this);

    this.state = {
      title: null
    };
  }

  showProductDetail(arrow, title) {
    this.props.selectProduct({arrow: arrow});
    this.setState({title});
  }

  render() {
    // console.log('this.props.arrows: ', this.props.arrows);

    const isActive = (title) => {
      if (this.state.title === title) {
        return 'active';
      } else {
        null;
      }
    };

    const showArrowNode = () => {
      return this.props.arrows.map( arrow => {
        return arrow.map( (arr, i) => {
          return <li key={i} className={isActive(arr.node.product.title)}><img src={ arr.node.image.src } title={ arr.node.product.title} alt={ arr.node.product.title } onClick={() => this.showProductDetail(arr, arr.node.product.title)} /><span>{arr.node.product.title}</span></li>;
        });
      });
    };

    return (
      <div id="accessory-type">
        <h6>Arrows</h6>
        <div className="container">
          <div>
            <ul className="items">
              { showArrowNode() }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
