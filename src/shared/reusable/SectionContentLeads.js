import React from 'react';
import './assets/css/section-content-leads.css';
import { Link } from 'react-router-dom';

export const SectionContentLeads = (props) => {
  const bgColor = {
    backgroundColor: props.bgColor
  }

  const buildH4 = () => {
    if (props.h4) {
      return <h4>{props.h4}</h4>;
    } else {
      return null;
    }
  }

  const buildLearnMore = () => {
    if (props.learnMore) {
      return <Link to={props.learnMore}>Learn More</Link>;
    } else {
      return null;
    }
  }

  const showImage = () => {
    if (props.imgWidth) {
      const imgDimensions = {
        width: props.imgWidth,
        height: 'auto'
      };

      return <img style={imgDimensions} src={props.imgSrc} />;
    } else {
      return <img src={props.imgSrc} />;
    }
  }

  const buildBuyNowLink = () => {
    if (props.buyNow) {
      return <Link to={props.buyNow}>{props.cta}</Link>;
    } else {
      return null;
    }
  }

  return (
    <section className="section-content-leads">
      <article style={bgColor}>
        <header>
          <h2>{props.h2}</h2>
          { buildH4() }
          { buildLearnMore() }
          { buildBuyNowLink() }
        </header>
        { showImage() }
      </article>
    </section>
  )
}
