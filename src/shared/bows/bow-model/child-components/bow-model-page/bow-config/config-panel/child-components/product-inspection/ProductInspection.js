import React, { Component } from 'react';

export default class ProductInspection extends Component {

  constructor() {
    super();

    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAddToBuild = this.handleAddToBuild.bind(this);

    this.state = {
      currentProduct: null,
      currentIndex: null,
      productAdded: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.productClicked !== null && prevProps.productClicked !== this.props.productClicked) {
        this.setState({
          currentIndex: this.props.productClicked.index,
          currentProduct: this.props.productClicked.product
        })
    }
  }

  handlePreviousClick() {
    let length = this.props.products.length;
    if (this.state.currentIndex > 0) {
      this.setState({
        currentIndex: this.state.currentIndex -= 1
      });
    } else {
      this.setState({
        currentIndex: length - 1
      })
    }
  }

  handleNextClick() {
    let length = this.props.products.length;
    if (this.state.currentIndex >= length - 1) {
      this.setState({
        currentIndex: 0
      })
    } else {
      this.setState({
        currentIndex: this.state.currentIndex += 1
      });
    }
  }

  handleClose() {
    this.setState({
      currentProduct: null,
      currentIndex: null,
      productAdded: false
    }, () => this.props.resetParentState() )
  }

  handleAddToBuild() {
    if(this.state.currentIndex === null) {
      this.props.addToBuild(this.props.products[this.props.productClicked.index])
    } else {
      this.props.addToBuild(this.props.products[this.state.currentIndex])
    }
    this.setState({productAdded: true}, () => {
      // need to destroy this set timeout if user closes manually
      setTimeout(this.handleClose, 3000)
    })
  }

  render() {

    if (this.state.currentProduct !== null && this.props.productClicked !== null) {
      return (
        <div id="product-inspection">
          <p id="close-inspection" onClick={this.handleClose}>CLOSE</p>
          <img src={this.props.products[this.state.currentIndex].node.image.src} alt={this.props.products[this.state.currentIndex].node.title === "Default Title" ? null : this.props.products[this.state.currentIndex].node.title}/>
          <div id="inspection-content-wrapper">
            <div id="inspection-content">
              <h6>{this.props.products[this.state.currentIndex].node.title === "Default Title" ? null : this.props.products[this.state.currentIndex].node.title}</h6>
              { this.state.productAdded ?
                <button className="active" >ADDED</button>
              :
                <button onClick={this.handleAddToBuild}>ADD TO BUILD</button>
              }
            </div>
            { this.props.products.length > 1 ? <p id="inspection-previous" onClick={this.handlePreviousClick}>PREVIOUS</p> : null }
            { this.props.products.length > 1 ? <p id="inspection-next" onClick={this.handleNextClick}>NEXT</p> : null }
          </div>
        </div>
      );
    } else if (this.state.currentProduct === null && this.props.productClicked !== null) {
      return (
        <div id="product-inspection">
          <p id="close-inspection" onClick={this.handleClose}>CLOSE</p>
          <img src={this.props.products[this.props.productClicked.index].node.image.src} alt={this.props.products[this.props.productClicked.index].node.title === "Default Title" ? null : this.props.products[this.props.productClicked.index].node.title}/>
          <div id="inspection-content-wrapper">
            <div id="inspection-content">
              <h6>{this.props.products[this.props.productClicked.index].node.title === "Default Title" ? null : this.props.products[this.props.productClicked.index].node.title}</h6>
              { this.state.productAdded ?
                <button className="active" >ADDED</button>
              :
                <button onClick={this.handleAddToBuild}>ADD TO BUILD</button>
              }
            </div>
            { this.props.products.length > 1 ? <p id="inspection-previous" onClick={this.handlePreviousClick}>PREVIOUS</p> : null }
            { this.props.products.length > 1 ? <p id="inspection-next" onClick={this.handleNextClick}>NEXT</p> : null }
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

}
