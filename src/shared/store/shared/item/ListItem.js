import React, { Component } from 'react';

export default class ListItem extends Component {
  render() {
    return (
      <article className="list-item">
        {/* main product image */}
        <img />

        {/*
          function to react to a hover state
          no hover - show '4 Colors'
          on hover - show variant images
        */}

        <header>
          <h5>Elite 11" Stabilizer</h5>
        </header>
        {/*

        */}
        <p>$70.00</p>

      </article>
    );
  }
}
