import React from 'react';
import './../../bow-model-page/assets/css/mod-chart.css';

export const ModChart = (props) => {

  const buildRows = () => {
    return props.modStatsArray.map( (mod, i) => {
      return (
        <tr key={i}>
          <td>{mod.name}</td>
          <td>{mod.speed}</td>
        </tr>
      );
    })
  };

  const buildTfoot = () => {
    return props.tFoot.map( (text, i) => {
      return <li key={i}>{text}</li>;
    });
  };

  return (
    <article id="mod-chart">
      <header><h3>Mods</h3></header>
      <table>
          <thead>
            <th>{props.modColumnTitle}</th>
            <th>{props.speedRatingColumnTitle}</th>
          </thead>
        <tbody>
          { buildRows() }
        </tbody>
        <tr>
          <td colSpan="2">
            <tfoot><ul>{ buildTfoot() }</ul></tfoot>
          </td>
        </tr>
      </table>
    </article>
  );
}
