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
	var css = this.selectedValue !== null ? 'current-selected-value-' + this.selectedValue + '"' : '';
	var html = '<div class="sudoku-board ' + css + '">';

	this.matrices.forEach(function(matrix, index) {
		html += matrix.getHtml(index);
	});
	html += '</div>';

	this.containerElem.innerHTML = html;

	if (this.resolved === true) {
		var wrapper = this.containerElem.parentNode;
		wrapper.innerHTML = '<div class="game-resolved-overlay">Completed!</div>' +
			wrapper.innerHTML;
	}
};

Board.prototype.selectCell = function selectCell(cellElem) {
	var value = parseInt(cellElem.innerText) || null;
	var cellIndex = cellElem.dataset.index;
	var matrixIndex = cellElem.parentElement.dataset.index;

	if (value !== null && value !== '') {
		this.selectedValue = value;
	}

	this.selectedCellIndex = parseInt(cellIndex);
	this.selectedMatrixIndex = parseInt(matrixIndex);
	this.selectedMatrix = this.matrices[this.selectedMatrixIndex];

	this.matrices.forEach(function (matrix){
		matrix.deselectAllCells();
	});
	this.matrices[this.selectedMatrixIndex].selectCell(this.selectedCellIndex, true);
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