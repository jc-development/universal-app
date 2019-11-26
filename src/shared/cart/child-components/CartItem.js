import React, { Component } from 'react';

export default class CartItem extends Component {

  render () {

      const modifyCartItem = this.props.modifyCartItem;

      let selectedOptions;
      if (this.props.line_item.variant.selectedOptions !== undefined) {
        selectedOptions = this.props.line_item.variant.selectedOptions.map((option, i) => {
          return <p key={i} className="cart-item-options">{option.name + ': ' + option.value}</p>
        })
      }

      let customAttributes;
      if (this.props.line_item.customAttributes.length > 0) {
        let strToManipulate = this.props.line_item.customAttributes[0].value;
        let stringArray = strToManipulate.split('\n');
        customAttributes = stringArray.map( (string, i) => {
          return (
            <p key={i}>{string}</p>
          );
        })
      }
    return (
      <div className='cart-item'>
          {this.props.line_item.variant.image !== null ? <img className='cart-image' src={this.props.line_item.variant.image.src} alt={`${this.props.line_item.title} product shot`}/> : this.props.line_item.variant.product.images.edges.length > 0 ? <img className='cart-image' src={this.props.line_item.variant.product.images.edges[0].node.src} alt={`${this.props.line_item.title} product shot`}/> : null }
          <div>
            <h6 className='cart-item-title'>{this.props.line_item.title}</h6>
            {this.props.line_item.variant.title === 'Default Title' ? null : selectedOptions}
            {this.props.line_item.customAttributes !== undefined ? customAttributes : null}
          </div>
          <ul className='cart-item-data'>
            <li className="cart-item-data-quantity-container">
              <h6>Quantity:</h6>
              <div className="cart-item-data-quantity">
              {this.props.line_item.variant.id === "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84MTUxOTgzMzkwOTM=" || this.props.line_item.variant.id === "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNzY3NjM4NzI4NzA5MQ==" || this.props.line_item.variant.id === "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNzY3NjM4Nzk0MjQ1MQ==" || this.props.line_item.title === 'Grunt Style "We The People" Tee' ? null : <button className="cart-item-quantity-decrease" onClick={() => modifyCartItem("decrementQuantity",this.props.line_item.variant.id)}>-</button> }
              <span className="cart-item-quantity">{this.props.line_item.quantity}</span>
              {this.props.line_item.variant.id === "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84MTUxOTgzMzkwOTM=" || this.props.line_item.variant.id === "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNzY3NjM4NzI4NzA5MQ==" || this.props.line_item.variant.id === "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNzY3NjM4Nzk0MjQ1MQ==" ||this.props.line_item.title === 'Grunt Style "We The People" Tee' ? null : <button className="cart-item-quantity-increase" onClick={() => modifyCartItem("incrementQuantity",this.props.line_item.variant.id)}>+</button> }
              </div>
              <button className="cart-item-remove" onClick={() => modifyCartItem("removeLineItemFromCart",this.props.line_item.variant.id)}>Remove</button>
            </li>
            <li className="cart-item-data-price-container">
              <h6>Price:</h6>
              {this.props.line_item.discountAllocations.length > 0 ?
                <div>
                  <p style={{color: "#999", textDecoration: "line-through"}}>${ (this.props.line_item.quantity * this.props.line_item.variant.priceV2.amount).toFixed(2) }</p>
                  <p>${ ((this.props.line_item.variant.priceV2.amount * this.props.line_item.quantity) - this.props.line_item.discountAllocations[0].allocatedAmount.amount).toFixed(2) }</p>
                </div>
                :
                <p>${ (this.props.line_item.quantity * this.props.line_item.variant.priceV2.amount).toFixed(2) }</p>
              }
            </li>
          </ul>
      </div>
      )
    }
}
