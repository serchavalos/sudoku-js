(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Matrix = require('./Matrix');

var Board = function Board(idContainer, matrices){
	this.containerElem = document.querySelector(idContainer);
	this.matrices = [];
	this.resolved = false;
	this.selectedCellIndex = null;
	this.selectedMatrixIndex = null;
	this.selectedMatrix = null;
	this.selectedValue = null;

	for (var i = 0; i < 9; i++) {
		if (typeof matrices != 'undefined' && matrices[i] !== null) {
			this.matrices.push(new Matrix(matrices[i]));
		} else {
			this.matrices.push(new Matrix());
		}		
	}
};

Board.prototype.onClick = function onClick(callback) {
  this.containerElem.addEventListener('click', callback);
};

Board.prototype.getCurrentColumnValues = function getCurrentColumnValues() {
	var allValues = [];
	var currentColumn = (parseInt(this.selectedMatrixIndex % 3))*3 + (this.selectedCellIndex % 3);
	var indexColumn = parseInt(currentColumn / 3);
	var indexRow = currentColumn % 3;
	var validMatrices = [indexColumn, indexColumn + 3, indexColumn + 6];
	var validCells = [indexRow, indexRow + 3, indexRow + 6];

	this.matrices.forEach(function(matrix, count) {
		if (validMatrices.indexOf(count) < 0) {
			return;
		}

		var values = matrix.getValues();

		validCells.forEach(function(cellIndex) {
			if (typeof values[cellIndex] != 'undefined') {
				allValues.push(values[cellIndex]);
			}
		});
	});

	return allValues;
};

Board.prototype.getCurrentRowValues = function getCurrentRowValues() {
	var allValues = [];
	var currentRow = (parseInt(this.selectedMatrixIndex / 3))*3 + (this.selectedCellIndex % 3);
	var index = parseInt(currentRow / 3) * 3;
	var rowIndex = (currentRow % 3)*3;
	var validMatrices = [index, index + 1, index + 2];
	var validCells = [rowIndex, rowIndex + 1, rowIndex + 2];

	this.matrices.forEach(function(matrix, count) {
		if (validMatrices.indexOf(count) < 0) {
			return;
		}

		var values = matrix.getValues();

		validCells.forEach(function(cellIndex) {
			if (typeof values[cellIndex] != 'undefined') {
				allValues.push(values[cellIndex]);
			}
		});
	});

	return allValues;
};

Board.prototype.getCurrentMatrixValues = function getCurrentMatrixValues() {
	return this.selectedMatrix.getValues();
};

Board.prototype.getValue = function getValue(col, row) {
	col = col - 1;
	row = row - 1;
	var indexMatrix = parseInt(row / 3) * 3 + parseInt(col / 3);
	var indexCell = (row % 3) * 3 + (col % 3);

	return this.matrices[indexMatrix].getValue(indexCell);
};

Board.prototype.setValue = function setValue(col, row, value) {
	col = col - 1;
	row = row - 1;

	var indexMatrix = parseInt(row / 3) * 3 + parseInt(col / 3);
	var indexCell = (row % 3) * 3 + (col % 3);

	if (typeof this.matrices[indexMatrix] === 'undefined') {
		throw new Error('Invalid row/column given. Provide numbers between 1 - 9');
	}

	var matrix = this.matrices[indexMatrix];
	
	try {
		matrix.setValue(indexCell, value);
	} catch (err) {
		throw new Error('Invalid row/column given. Provide numbers between 1 - 9');
	}
};

Board.prototype.updateView = function updateView() {
	if (this.resolved === true) {
		var wrapper = this.containerElem.parentNode;
		wrapper.innerHTML = '<div class="game-resolved-overlay">Completed!</div>' +
			wrapper.innerHTML;
	}

	var css = this.selectedValue !== null ? ' current-selected-value-' + this.selectedValue + '"' : null;
	var html = '<div class="sudoku-board ' + css + '">';

	this.matrices.forEach(function(matrix, index) {
		html += matrix.getHtml(index);
	});
	html += '</div>';

	this.containerElem.innerHTML = html;
};

Board.prototype.selectCell = function(cellElem) {
	var value = parseInt(cellElem.innerText) || null;
	var cellIndex = cellElem.dataset.index;
	var matrixIndex = cellElem.parentElement.dataset.index;

	this.selectedCellIndex = parseInt(cellIndex);
	this.selectedMatrixIndex = parseInt(matrixIndex);
	this.selectedMatrix = this.matrices[this.selectedMatrixIndex];
	this.selectedValue = value;
};

Board.prototype.setValueOnSelectedCell = function setValueOnSelectedCell(value) {
	if (this.selectedMatrix === null || this.selectedCellIndex === null) {
		return; // Ignore
	}

	this.selectedMatrix.setValue(this.selectedCellIndex, value);
	this.selectedValue = value;
};

Board.prototype.clearSelectedCell = function clearSelectedCell() {
	if (this.selectedMatrix === null) {
		return; // Ignore
	}

	this.selectedMatrix.clearCell(this.selectedCellIndex);
};

Board.prototype.isComplete = function isComplete() {
	var totalCells = 0;
	this.matrices.forEach(function(matrix) {
		totalCells += matrix.getValues().length;
	});

	return totalCells === 81;
};

Board.prototype.markAsResolved = function markAsResolved() {
	this.resolved = true;
};

module.exports = Board;
},{"./Matrix":6}],2:[function(require,module,exports){
var Cell = function Cell(value) {
	this.editable = true;

	try {
		this.setValue(value);
		this.editable = false;
	} catch (err) {
		// Ignore it.
		this.value = null;
	}
};

Cell.prototype.setValue = function setValue(value) {
	if (this.editable === false) {
		throw new Error('This is a permanent cell');
	}

	if (typeof value != 'number') {
		throw new Error('Invalid value given. Enter a number');
	}

	if (value < 1 || value > 9) {
		throw new Error('Invalid value given. Enter a number between 1 and 9');
	}

	this.value = value;
};

Cell.prototype.clear = function clear(value) {
	this.value = null;
};

Cell.prototype.getValue = function getValue() {
	return this.value;
};

Cell.prototype.isEmpty = function isEmpty() {
	return (this.value === null);
}

Cell.prototype.getHtml = function getHtml(index) {
	var dataAttr = typeof index != 'undefined' ? 'data-index="' + index + '"' : '';
	var text = this.value !== null ?  this.value : '';
	var css = (this.value === null !== null ? 'value-' + this.value : '')
		+ (this.editable ? '' : ' fixed');

	return '<div class="sudoku-cell ' + css + '" ' + dataAttr + '>' + text + '</div>';
};

module.exports = Cell;
},{}],3:[function(require,module,exports){
var DuplicationDetector = function DuplicationDetector() {
  this.values = {
    column: [],
    row: [],
    matrix: [],
  };
};

DuplicationDetector.prototype.updateFromBoard = function updateFromBoard(board) {
  this.values.column = board.getCurrentColumnValues();
  this.values.row = board.getCurrentRowValues();
  this.values.matrix = board.getCurrentMatrixValues();
};

DuplicationDetector.prototype.hasDuplicatedValues = function hasDuplicatedValues() {
  for (name in this.values) {
    if (this.values.hasOwnProperty(name)) {
      if (this.hasDuplicated(this.values[name])) {
        return true;
      }
    }
  }

  return false;
};

DuplicationDetector.prototype.hasDuplicated = function hasDuplicated(values) {
  var uniqueValues = [];

  values.forEach(function(item) {
    if (uniqueValues.indexOf(item) < 0 ) {
      uniqueValues.push(item);
    }
  });

  return !(uniqueValues.length === values.length);
};

module.exports = DuplicationDetector;
},{}],4:[function(require,module,exports){
var Board = require('./Board.js');
var Matrix = require('./Matrix.js');
var Cell = require('./Cell.js');
var Keyboard = require('./Keyboard.js');
var DuplicationDetector = require('./DuplicationDetector.js');

var GameController = function GameController(idBoard, boardValues, idKeyboard) {
  this.board = new Board(idBoard, boardValues);
  this.keyboard = new Keyboard(idKeyboard);
  this.detector = new DuplicationDetector();
  this.allCells;
};

GameController.prototype.init = function init() {
  this.board.updateView();
  this.allCells = document.querySelectorAll('.sudoku-cell');

  this.board.onClick( this.onBoardClicked.bind(this) );
  this.keyboard.onClick( this.onKeyboardClicked.bind(this) );
};

GameController.prototype.onKeyboardClicked = function onKeyboardClicked(event) {
  event.preventDefault();

  var keyElem;
  if (!(keyElem = event.target).classList.contains('keyboard-key')) {
    return;
  }

  if (keyElem.dataset.keyValue === 'clear') {
    this.board.clearSelectedCell();
    this.board.updateView();
    return;
  }

  this.keyboard.selectNumber(keyElem);
  this.keyboard.updateView();

  var number = this.keyboard.getSelectedNumber();
  this.board.setValueOnSelectedCell(number);
  this.detector.updateFromBoard(this.board);

  if (this.board.isComplete() && this.detector.hasDuplicatedValues() === false) {
    this.board.markAsResolved();
  }

  this.board.updateView();
};

GameController.prototype.onBoardClicked = function onBoardClicked(event) {
  event.preventDefault();

  var cellElem;
  if (!(cellElem = event.target).classList.contains('sudoku-cell')) {
    return;
  }

  this.board.selectCell(cellElem);
  this.board.updateView();

  Array.prototype.forEach.call(this.allCells, function(cellElem) {
    // It seems that classList API is too slow with 81 elements...
    cellElem.className = cellElem.className.replace(/selected/, '');
  });
  cellElem.className += ' selected';

};

module.exports = GameController;
},{"./Board.js":1,"./Cell.js":2,"./DuplicationDetector.js":3,"./Keyboard.js":5,"./Matrix.js":6}],5:[function(require,module,exports){
var Keyboard = function Keyboard(idContainer) {
  this.containerElem = document.querySelector(idContainer);
  this.selectedNumber = null;
  this.keyElems = document.querySelectorAll(idContainer + ' .keyboard-key');
};

Keyboard.prototype.onClick = function onClick(callback) {
 this.containerElem.addEventListener('click', callback);
};

Keyboard.prototype.selectNumber = function(keyElem) {
  var keyValue = parseInt(keyElem.dataset.keyValue);
  if (isNaN(keyValue) || keyValue === 0) {
    return; // Invalid number received
  }

  this.selectedNumber = keyValue;
};

Keyboard.prototype.getSelectedNumber = function getSelectedNumber() {
  return this.selectedNumber;
};

Keyboard.prototype.updateView = function updateView() {
  var index = this.selectedNumber - 1;

  Array.prototype.forEach.call(this.keyElems, function(keyElem) {
    keyElem.classList.remove('selected');
  });

  this.keyElems[index].classList.add('selected');
};

module.exports = Keyboard;
},{}],6:[function(require,module,exports){
var Cell = require('./cell.js');

var Matrix = function Matrix(values) {
	this.cells = [];
	var currentValues = [];

	for (var i = 0, value = null; i < 9; i++) {
		if (typeof values == 'undefined') {
			// don't do anything
		} else if (typeof values[i] == 'number' || values[i] === null) {
			value = values[i];
		} else if (typeof values[i] == 'object' && /Cell/.test(values[i].constructor)) {
			value = values[i].getValue();
		}

		currentValues.push(value);
		this.cells[i] = new Cell(value);
	}
};

Matrix.prototype.getValue = function getValue(index) {
	if (typeof this.cells[index] === 'undefined') {
		throw new Error('Index error');
	}

	return this.cells[index].getValue();
};

Matrix.prototype.getValues = function getValues() {
	var values = [];
	this.cells.forEach(function(item) {
		if (!item.isEmpty()) {
			values.push(item.getValue());
		}
	});
	return values;
};

Matrix.prototype.setValue = function setValue(index, value) {
	if (typeof this.cells[index] === 'undefined') {
		throw new Error('Index error');
	}

	this.cells[index].setValue(value);
};

Matrix.prototype.clearCell = function getCell(index) {
	if (typeof this.cells[index] === 'undefined') {
		throw new Error('Index error');
	}

	this.cells[index].clear();
};

Matrix.prototype.getHtml = function getHtml(index) {
	var dataAttr = typeof index != 'undefined' ? 'data-index="' + index + '"' : '';
	var html = '<div class="sudoku-matrix" ' + dataAttr + '>';
	this.cells.forEach(function(cell, index) {
		html += cell.getHtml(index);
	});
	html += '</div>';

	return html;
};

module.exports = Matrix;
},{"./cell.js":7}],7:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],8:[function(require,module,exports){
var GameController = require('./GameController.js');

var boardValues = [
  [9,6,1,8,3,5,2,7,4], [4,3,8,7,2,9,6,5,1], [7,2,5,1,4,6,3,9,8],
  [7,1,2,6,4,8,3,5,9], [5,8,6,3,9,2,1,4,7], [4,3,9,5,7,1,6,8,2],
  [4,2,6,5,9,7,1,8,3], [9,7,5,8,1,3,2,6,4], [8,1,3,2,6,4,9,5,null]
];

var controller = new GameController('#board-container', boardValues, '#keyboard-container');

controller.init();
},{"./GameController.js":4}]},{},[8]);
