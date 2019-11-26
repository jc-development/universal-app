import React, { Component } from 'react';

export default class DrawLengths extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(length) {
    this.setState({length});
    this.props.setLength(length);
  }

  render() {

    // console.log('this.props drawLengths: ', this.props)

    const isChecked = (length) => {
      if (length === this.props.currentLength) {
        return true;
      } else {
        return false;
      }
    };

    const radioButtonNodes = () => {
      return this.props.drawLengths.map((length, i) => {
        return (
          <label key={i} htmlFor={`drawLength-${i}`} className={this.props.currentLength === length ? "active" : null}>
            <input type="radio" id={`drawLength-${i}`} name={`drawLength-${i}`} value={length} checked={!!isChecked(length)} onClick={() => this.handleClick(length)} />
            {length}"
          </label>
        );
      });
    };

    const dropDownNodes = () => {
      return this.props.drawLengths.map(length => {
        return <option value={length}>{length}</option>;
      });
    }
    return (
      <div className="spec-wrapper">
        <h6>Draw Length</h6>
        { this.props.currentBowModel === 'kure' || this.props.currentBowModel === 'rezult' ?
            <p style={{margin: 0}}>Draw length is adjustable from {this.props.drawLengths[0]}" - {this.props.drawLengths[this.props.drawLengths.length - 1]}" and will ship from the factory at 29" draw. Dealer will set the final draw length.</p>
          :
            radioButtonNodes()
        }
        {/* for mobile
        <select>
          { dropDownNodes() }
        </select>
        */}
      </div>
    );
  }

}
