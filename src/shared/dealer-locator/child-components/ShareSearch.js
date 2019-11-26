import React from 'react';

import Clipboard from 'clipboard'

export const ShareSearch = (props) => {

  new Clipboard('.copy');

  return (
    <div className="share-search-modal-outer">
      <div className="share-search-modal-inner">
        <h5>Share My Search using the link below</h5>
        <p>{props.shareLink}</p><button className="copy" data-clipboard-text={props.shareLink}>COPY</button>
        <span className="close" onClick={props.closeShareModal}>X</span>
      </div>
    </div>
  )
}
