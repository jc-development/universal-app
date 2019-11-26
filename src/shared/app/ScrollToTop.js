import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {

      window.ga('set', 'page', window.location.pathname);
      window.ga('send', 'pageview');

      var _hsq = window._hsq = window._hsq || [];
      _hsq.push(['setPath', window.location.pathname]);
      _hsq.push(['trackPageView']);

      window.scrollTo(0, 0)

    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
