import React from 'react';
import { Link } from 'react-router-dom';
import apparelIconSrc from './../assets/images/apparel.jpg';

const shirtLinks = (bowSKU) => {
  switch (bowSKU) {
    case '18ritl':
      return (
        <Link to="/store/apparel/men-t-shirts/honor-the-ritual-tee">
          <div className="shirt">
            <h7>CLICK TO SHOP THE RITUAL SHIRT</h7>
            <img src="https://cdn.shopify.com/s/files/1/0865/3892/products/Ritual_Shirt_500x.png?v=1521687373"  alt="Elite Archery Honor The Ritual Shirt"/>
            <p>HONOR THE RITUAL TEE</p>
          </div>
        </Link>
      );

    default:
    const apparelStyle = {
      width: "100%"
    }
      return (
    <Link to="/store/apparel/">
      <div className="shirt">
        <h7>SHOP ELITE APPAREL</h7>
        <img style={apparelStyle} src={apparelIconSrc} alt="Shop Elite Archery Apparel" />
      </div>
    </Link>);
  }
}

export const ShirtUpseller = (props) => {
  return shirtLinks(props.bowSKU)
}
