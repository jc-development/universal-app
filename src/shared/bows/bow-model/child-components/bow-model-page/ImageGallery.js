import React, { Component } from 'react';
import './assets/css/image-gallery.css';

export default class ImageGallery extends Component {

  render() {
    const imgArray = [
      "https://s3.amazonaws.com/elite-website/v2/images/bow-models/ritual/ritual-1.jpg",
      "https://s3.amazonaws.com/elite-website/v2/images/bow-models/ritual/ritual-2.jpg",
      "https://s3.amazonaws.com/elite-website/v2/images/bow-models/ritual/ritual-3.jpg",
      "https://s3.amazonaws.com/elite-website/v2/images/bow-models/ritual/ritual-4.jpg",
      "https://s3.amazonaws.com/elite-website/v2/images/bow-models/ritual/ritual-5.jpg",
      "https://s3.amazonaws.com/elite-website/v2/images/bow-models/ritual/ritual-6.jpg",
      "https://s3.amazonaws.com/elite-website/v2/images/bow-models/ritual/ritual-7.jpg",
      "https://s3.amazonaws.com/elite-website/v2/images/bow-models/ritual/ritual-8.jpg",
    ];

    const getImgs = (start, end) => {

      let filteredArray = [];
      // get images inclusive start to end
      for (let i = start; i <= end; i++) {
        filteredArray.push(this.props.imageGallery[i]);
      }

      return filteredArray.map((node) => {
        const divStyle = {
          backgroundImage: `url(${node})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        };
        return (<div style={divStyle} />);
      });
    }

    return (
      <section id="image-gallery" ref={this.props.imageGalleryRef}>
        <div className="row-1">
          { getImgs(0, 1) }
        </div>
        <div className="row-2">
          { getImgs(2, 4) }
        </div>
        <div className="row-3">
          { getImgs(5, 7) }
        </div>
      </section>
    );
  }
}
