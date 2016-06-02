var Cell = require('./Cell');

var Board = function Board(idContainer, cellsValues){
	this.boardElem = null;
	this.containerElem = document.querySelector(idContainer);
	this.cells = [];
	this.resolved = false;
	this.selectedIndex = null;

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


	this.containerElem.addEventListener('click', (function(){
		event.preventDefault();

		var cellElem;
		if (!(cellElem = event.target).classList.contains('sudoku-cell')
			|| !('index' in cellElem.dataset)) {
				return;
	  }

    this.selectCell(cellElem.dataset.index);
    this.updateView();
	}).bind(this));
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

Board.prototype.getValue = function getValue(col, row) {
	col = col - 1;
	row = row - 1;
	var indexMatrix = parseInt(row / 3) * 3 + parseInt(col / 3);
	var indexCell = (row % 3) * 3 + (col % 3);

	return this.cells[indexMatrix].getValue(indexCell);
};

Board.prototype.setValue = function setValue(col, row, value) {
	col = col - 1;
	row = row - 1;

	var indexMatrix = parseInt(row / 3) * 3 + parseInt(col / 3);
	var indexCell = (row % 3) * 3 + (col % 3);

	if (typeof this.cells[indexMatrix] === 'undefined') {
		throw new Error('Invalid row/column given. Provide numbers between 1 - 9');
	}

	var matrix = this.cells[indexMatrix];

	try {
		matrix.setValue(indexCell, value);
	} catch (err) {
		throw new Error('Invalid row/column given. Provide numbers between 1 - 9');
	}
};

Board.prototype.updateView = function updateView() {
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
};

Board.prototype.selectCell = function selectCell(index) {
	if (typeof this.cells[index] == 'undefined') {
		return;
	}

	this.selectedIndex = parseInt(index);
};

Board.prototype.setValueOnSelectedCell = function setValueOnSelectedCell(value) {
	if (this.selectedIndex === null) {
		return;
	}

	this.cells[this.selectedIndex].setValue(value);
};

Board.prototype.clearSelectedCell = function clearSelectedCell() {
	if (this.selectedIndex === null) {
		return; // Ignore
	}

	this.getSelectedCell().clear();
};

Board.prototype.isComplete = function isComplete() {
	for (var i = 0, l = this.cells.length; i < l; i++) {
		if (this.cells[i].getValue() === null) {
			return false;
		}
	}

	return true;
};

Board.prototype.markAsResolved = function markAsResolved() {
	this.resolved = true;
};

Board.prototype.getSelectedCell = function getSelectedCell() {
	return this.selectedIndex in this.cells ? this.cells[this.selectedIndex] : null;
};

module.exports = Board;
