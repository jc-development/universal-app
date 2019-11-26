import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BowAccessoriesAddon extends Component {

  render () {
    return (
      <article id="bow-accessories">
        <h4>Bow Accessories</h4>
        <p>Keep your new bow safe in transport with the <Link  to="store/accessories/bow-case/elite-pro-single-bowcase">Elite Pro Series Bowcase</Link></p>
        <p>Start your season right with a 12 pack of <Link to="store/accessories/arrows/elite-350-arrow-12-pack">Elite 350 Arrows</Link></p>
        <p>Never miss your shot again using the <Link to="store/accessories/bow-sight/ex5-elite-hunting-sight">Elite EX5 Hunting Sight</Link></p>
      </article>
    )
  }
}
