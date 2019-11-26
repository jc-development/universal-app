import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './assets/css/accessories-image.css';

export default class AccessoriesImage extends Component {

  render() {
    return (
      <section id="accessories-image" ref={this.props.accessoriesImageRef}>
        {this.props.accessoriesImage !== null ?
          <article>
          <Link to="/store/accessories">
            <header>
              <h2>Accessories for the {this.props.bowFamilyName} Bow</h2>
              <h3>Shop now</h3>
            </header>
            <img src={this.props.accessoriesImage} alt={`Elite Archery Accessories for the ${this.props.bowFamilyName} Bow`} />
            </Link>
          </article>
        :null}
        </section>
      );

  }
}
