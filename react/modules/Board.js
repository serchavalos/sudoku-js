import React from 'react'
import Cell from './Cell'

export default React.createClass({
  getInitialState() {
    return { 
      selected: null,
      cells: this.props.cells
    };
  },

  getCells() {
    let self = this;
    return this.state.cells.map(function (value, index) {
      let row = parseInt(parseInt(index / 9) / 3);
      let column = parseInt((index % 9) / 3);
      let matrixIndex = column + row * 3;

      let cssClasses = [];
      if (matrixIndex % 2 == 0) cssClasses.push('m-odd')
      if (value !== null)  {
        cssClasses.push('fixed');
        cssClasses.push('value-' + value);
      }

      return (
        <Cell key={index}
          value={value}
          cssClasses={cssClasses}
          onClick={() => { self.handleClick(value) }} />
      )
    });
  },

  componentDidMount() {
    this.props.router.subscribe(function(number)
    {
      this.setState({selected: number});
    }.bind(this));
  },

  handleClick(selectedNumber) {
    this.setState({selected: selectedNumber});
  },

  render() {
    let cssClass = '';
    if (this.state.selected !== null) {
      cssClass = 'current-selected-value-' + this.state.selected;
    }

    return (
      <div className={ 'sudoku-board ' + cssClass }>
        { this.getCells() }
      </div>
    )
  }
})