let Cell = require('./Cell');
let Matrix = require('./Matrix');

class Board {
  constructor (idContainer, cellsValues, PubSub) {
    this.boardElem = null;
    this.viewNeedsUpdate = false;
    this.containerElem = document.querySelector(idContainer);
    this.cells = [];
    this.selectedIndex = null;
    this.pubSub = PubSub;

    for (let index = 0; index < 81; index++) {
      if (typeof cellsValues != 'undefined' && cellsValues[index] !== null) {
        this.cells.push(new Cell(index, cellsValues[index]));
      } else {
        this.cells.push(new Cell(index));
      }
    }

  }

  init () {
    this.boardElem = document.createElement('div');
    this.boardElem.classList.add('sudoku-board');
    this.containerElem.appendChild(this.boardElem);

    let cellListFragment = document.createDocumentFragment();
    this.cells.forEach(function(cell) {
      cellListFragment.appendChild(cell.getElement());
    });
    this.boardElem.appendChild(cellListFragment);

    // Setup events
    this.containerElem.addEventListener('click', this.onBoardClicked.bind(this));
    this.pubSub.subscribe('on-clear-key-pressed', this.onClearKeyPressed.bind(this));
    this.pubSub.subscribe('on-number-key-pressed', this.onNumberKeyPressed.bind(this));
  }

  updateView () {
    let self = this;
    if (!self.viewNeedsUpdate) {
      return;
    }

    let css = '', currentValue = null, currentCssClass;
    if (self.selectedIndex !== null) {
      currentValue = self.cells[self.selectedIndex].getValue();
      let matches = self.boardElem.className.match(/current-selected-value-\d+/);
      currentCssClass = matches ? matches[0] : null;
    }

    if (currentValue) {
      self.boardElem.classList.remove(currentCssClass);
      self.boardElem.classList.add('current-selected-value-' + currentValue);
    }

    self.cells.forEach(function(cell, index) {
      cell.setSelectAttr(index === self.selectedIndex);
    });

    self.viewNeedsUpdate = false;
  }

  onClearKeyPressed (topic) {
    if (this.selectedIndex === null) {
      return; // Ignore
    }

    this.cells[this.selectedIndex].clear();
    this.viewNeedsUpdate = true;
  }

  onNumberKeyPressed (topic, pressedNumber) {
    if (this.selectedIndex === null) {
      return; // Ignore
    }

    this.cells[this.selectedIndex].setValue(pressedNumber);

    if (this._isComplete()) {
      let matrix = new Matrix(this._getCellValues(), this.selectedIndex);
      this.pubSub.publish('on-board-completed', matrix);
    }

    this.viewNeedsUpdate = true;
  }

  onBoardClicked (event) {
    event.preventDefault();

    let cellElem = event.target;
    while (cellElem.classList.contains('sudoku-cell') === false ) {
      cellElem = cellElem.parentNode;
    }

    if (!('index' in cellElem.dataset)) {
        return;
    }

    this.selectedIndex = parseInt(cellElem.dataset.index);
    this.viewNeedsUpdate = true;
  }

  _getCellValues () {
    let cellValues = [];
    for (let i = 0, l = this.cells.length; i < l; i++) {
      cellValues.push(this.cells[i].getValue());
    }
    return cellValues;
  }

  _isComplete () {
    for (let i = 0, l = this.cells.length; i < l; i++) {
      if (this.cells[i].getValue() === null) {
        return false;
      }
    }

    return true;
  }
}

module.exports = Board;
