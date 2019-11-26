import React from 'react';
import { Link } from 'react-router-dom';
import './assets/css/mini-models-menu.css';

import ritualSrc from './assets/images/ritual.png';
import impulseSrc from './assets/images/impulse.png';
import tempoSrc from './assets/images/tempo.png';
import impressionSrc from './assets/images/impression.png';
import emergeSrc from './assets/images/emerge.png';
import enlistSrc from './assets/images/enlist.png';
import revolSrc from './assets/images/revol.png';
import echelonSrc from './assets/images/echelon.png';
import victoryXSrc from './assets/images/victoryx.png';

export const MiniModelsMenu = (props) => (
  <nav className="mini-bows-list">
    <section>
      <h3>2019</h3>
      <ul>
        <li><Link to="/elite-bows/ritual/overview"><img src={ritualSrc} alt="Link to Elite Archery Ritual Bow Family"/>ritual</Link></li>
        <li><Link to="/elite-bows/impression/overview>"><img src={impressionSrc} alt="Link to Elite Archery Impression Bow Family"/>impression</ Link></li>
        <li><Link to="/elite-bows/emerge/overview"><img src={emergeSrc} alt="Link to Elite Archery Emerge Bow Family"/>emerge</ Link></li>
        <li><Link to="/elite-bows/echelon/overview"><img src={echelonSrc} alt="Link to Elite Archery Echelon Bow Family"/>echelon</ Link></li>
        <li><Link to="/elite-bows/victory/overview"><img src={victoryXSrc} alt="Link to Elite Archery Victory Bow Family"/>victory</ Link></li>
      </ul>
    </section>
    <section>
      <h3>2018</h3>
      <ul>
        <li><Link to="/elite-bows/revol/overview"><img src={revolSrc} alt="Link to Elite Archery Revol Bow Family"/>revol</ Link></li>
        <li><Link to="/elite-bows/enlist/overview"><img src={enlistSrc} alt="Link to Elite Archery Enlist Bow Family"/>enlist</ Link></li>
        <li><Link to="/elite-bows/tempo/overview"><img src={tempoSrc} alt="Link to Elite Archery Tempo Bow Family"/>tempo</ Link></li>
      </ul>
    </section>
  </nav>
);

/*
<li><img src={optionSrc} />option</li>
<li><img src={tempoSrc} />tempo</li>
<li><img src={impulseSrc} />impulse</li>
*/
