var Cell = require('./Cell');

var Board = function Board(idContainer, cellsValues, duplicationDetector){
  this.boardElem = null;
  this.viewNeedsUpdate = false;
  this.containerElem = document.querySelector(idContainer);
  this.cells = [];
  this.resolved = false;
  this.selectedIndex = null;
  this.detector = duplicationDetector;

  for (var index = 0; index < 81; index++) {
    if (typeof cellsValues != 'undefined' && cellsValues[index] !== null) {
      this.cells.push(new Cell(index, cellsValues[index]));
    } else {
      this.cells.push(new Cell(index));
    }
  }

};

Board.prototype.init = function init(PubSub) {
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
  PubSub.subscribe('on-clear-key-pressed', this.onClearKeyPressed.bind(this));
  PubSub.subscribe('on-number-key-pressed', this.onNumberKeyPressed.bind(this));
};


Board.prototype.getCurrentColumnValues = function getCurrentColumnValues() {
  var allValues = [];
  var columnIndex = this.selectedIndex % 9;
  while(columnIndex < 81) {
    allValues.push(this.cells[columnIndex].getValue());
    columnIndex += 9;
  }

  return allValues;
};

Board.prototype.getCurrentRowValues = function getCurrentRowValues() {
  var allValues = [];
  var row = Math.floor(this.selectedIndex / 9);
  var rowStart = row * 9;
  var rowEnd = rowStart + 9;

  for (var i = rowStart; i < rowEnd; i++) {
    allValues.push(this.cells[i].getValue());
  }
  return allValues;
};

Board.prototype.getCurrentMatrixValues = function getCurrentMatrixValues() {
  var allValues = [];
  var row = Math.floor(this.selectedIndex / 9);
  var column = this.selectedIndex % 9;

  var matrixStart = (parseInt(row / 3) * 3) * 9;
  var matrixEnd = matrixStart + (3 * 9);
  var columnShift = parseInt(column / 3) * 3;

  for (var rowIndex = matrixStart; rowIndex < matrixEnd; rowIndex += 9) {
    for (var index = rowIndex + columnShift, limit = index + 3; index < limit; index++) {
      allValues.push(this.cells[index].getValue());
    }
  }

  return allValues;
};

Board.prototype.updateView = function updateView() {
  if (!this.viewNeedsUpdate) {
    return;
  }

  var css = '';
  if (this.selectedIndex !== null) {
    var currentValue = this.cells[this.selectedIndex].getValue();
    var matches = this.boardElem.className.match(/current-selected-value-\d+/);
    var currentCssClass = matches ? matches[0] : null;
  }

  if (currentCssClass) {
    this.boardElem.classList.remove(currentCssClass);
  }

  if (currentValue) {
    this.boardElem.classList.add('current-selected-value-' + currentValue);
  }

  if (this.resolved === true) {
    var wrapper = this.containerElem.parentNode;
    wrapper.innerHTML = '<div class="game-resolved-overlay">Completed!</div>' +
      wrapper.innerHTML;
  }

  this.viewNeedsUpdate = false;
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

  if (this.isComplete() && this.detector.hasDuplicatedValues(this) === false) {
    this.resolved = true;
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

module.exports = Board;
