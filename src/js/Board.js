var Cell = require('./Cell');
var Matrix = require('./Matrix');

var Board = function Board(idContainer, cellsValues, PubSub){
  this.boardElem = null;
  this.viewNeedsUpdate = false;
  this.containerElem = document.querySelector(idContainer);
  this.cells = [];
  this.selectedIndex = null;
  this.pubSub = PubSub;

  for (var index = 0; index < 81; index++) {
    if (typeof cellsValues != 'undefined' && cellsValues[index] !== null) {
      this.cells.push(new Cell(index, cellsValues[index]));
    } else {
      this.cells.push(new Cell(index));
    }
  }

};

Board.prototype.init = function init() {
  this.boardElem = document.createElement('div');
  this.boardElem.classList.add('sudoku-board');
  this.containerElem.appendChild(this.boardElem);

  var cellListFragment = document.createDocumentFragment();
  this.cells.forEach(function(cell) {
    cellListFragment.appendChild(cell.getElement());
  });
  this.boardElem.appendChild(cellListFragment);

  // Setup events
  this.containerElem.addEventListener('click', this.onBoardClicked.bind(this));
  this.pubSub.subscribe('on-clear-key-pressed', this.onClearKeyPressed.bind(this));
  this.pubSub.subscribe('on-number-key-pressed', this.onNumberKeyPressed.bind(this));
};

Board.prototype.updateView = function updateView() {
  var self = this;
  if (!self.viewNeedsUpdate) {
    return;
  }

  var css = '';
  if (self.selectedIndex !== null) {
    var currentValue = self.cells[self.selectedIndex].getValue();
    var matches = self.boardElem.className.match(/current-selected-value-\d+/);
    var currentCssClass = matches ? matches[0] : null;
  }

  if (currentCssClass) {
    self.boardElem.classList.remove(currentCssClass);
  }

  if (currentValue) {
    self.boardElem.classList.add('current-selected-value-' + currentValue);
  }

  self.cells.forEach(function(cell, index) {
    cell.setSelectAttr(index === self.selectedIndex);
  });

  self.viewNeedsUpdate = false;
};

Board.prototype.isComplete = function isComplete() {
  for (var i = 0, l = this.cells.length; i < l; i++) {
    if (this.cells[i].getValue() === null) {
      return false;
    }
  }

  return true;
};

Board.prototype.onClearKeyPressed = function onClearKeyPressed(topic) {
  if (this.selectedIndex === null) {
    return; // Ignore
  }

  this.cells[this.selectedIndex].clear();
  this.viewNeedsUpdate = true;
};

Board.prototype.onNumberKeyPressed = function onNumberKeyPressed(topic, pressedNumber) {
  if (this.selectedIndex === null) {
    return; // Ignore
  }

  this.cells[this.selectedIndex].setValue(pressedNumber);

  if (this.isComplete()) {
    var matrix = new Matrix(this._getCellValues(), this.selectedIndex);
    this.pubSub.publish('on-board-completed', matrix);
  }

  this.viewNeedsUpdate = true;
};

Board.prototype.onBoardClicked = function onBoardClicked(event) {
  event.preventDefault();

  var cellElem;
  if (!(cellElem = event.target).classList.contains('sudoku-cell')
    || !('index' in cellElem.dataset)) {
      return;
  }
  this.selectedIndex = parseInt(cellElem.dataset.index);
  this.viewNeedsUpdate = true;
};

Board.prototype._getCellValues = function() {
  for (var index = 0, cellValues = [], length = this.cells.length; index++ < length;) {
    cellValues.push(cell.getValue());
  };
  return cellValues;
};

module.exports = Board;
