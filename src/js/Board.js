var Matrix = require('./Matrix');
var IndexError = require('./exceptions/IndexError.js');
var DuplicatedValueError = require('./exceptions/DuplicatedValueError.js');

var Board = function Board(idContainer, matrices){
	this.containerElem = document.querySelector(idContainer);
	this.matrices = [];
	this.selectedCellIndex = null;
	this.selectedMatrixIndex = null;
	this.selectedMatrix = null;

	for (var i = 0; i < 9; i++) {
		if (typeof matrices != 'undefined' && matrices[i] !== null) {
			this.matrices.push(new Matrix(matrices[i]));
		} else {
			this.matrices.push(new Matrix());
		}		
	}

};

Board.prototype.getValuesForColumn = function getValuesForColumn(column) {
	var allValues = [];
	var indexColumn = parseInt(column / 3);
	var indexRow = column % 3;
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

Board.prototype.getValuesForRow = function getValuesForRow(row) {
	var allValues = [];
	var index = parseInt(row / 3) * 3;
	var rowIndex = (row % 3)*3;
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
		if (err instanceof IndexError) {
			throw new Error('Invalid row/column given. Provide numbers between 1 - 9');
		} else if (err instanceof DuplicatedValueError) {
			throw new Error('Invalid value. It is already duplicated');
		}
	}
};

Board.prototype.updateView = function updateView() {
	var html = '<div class="sudoku-board">';

	this.matrices.forEach(function(matrix, index) {
		html += matrix.getHtml(index);
	});
	html += '</div>';

	this.containerElem.innerHTML = html;
};

Board.prototype.selectCell = function(cellElem) {
	var cellIndex = cellElem.dataset.index;
	var matrixIndex = cellElem.parentElement.dataset.index;

	this.selectedCellIndex = parseInt(cellIndex);
	this.selectedMatrixIndex = parseInt(matrixIndex);

	this.selectedMatrix = this.matrices[this.selectedMatrixIndex];
};

Board.prototype.setValueOnSelectedCell = function setValueOnSelectedCell(value) {
	if (this.selectedMatrix === null || this.selectedCellIndex === null) {
		return; // Ignore
	}

	var currentColumn = (parseInt(this.selectedMatrixIndex % 3))*3 + (this.selectedCellIndex % 3);
	var currentRow = (parseInt(this.selectedMatrixIndex / 3))*3 + (this.selectedCellIndex % 3);

	var currentColumnValues = this.getValuesForColumn(currentColumn);
	var currentRowValues = this.getValuesForRow(currentRow);

	if (currentColumnValues.indexOf(value) > -1 || currentRowValues.indexOf(value) > -1) {
		throw new DuplicatedValueError();
	}

	this.selectedMatrix.setValue(this.selectedCellIndex, value);
};

Board.prototype.clearSelectedCell = function clearSelectedCell() {
	if (this.selectedMatrix === null) {
		return; // Ignore
	}

	this.selectedMatrix.clearCell(this.selectedCellIndex);
};

module.exports = Board;