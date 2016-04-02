var Matrix = require('./Matrix');
var IndexError = require('./exceptions/IndexError.js');
var DuplicatedValueError = require('./exceptions/DuplicatedValueError.js');

var Board = function Board(matrices){
	this.matrices = [];
	for (var i = 0; i < 9; i++) {
		if (typeof matrices != 'undefined' && matrices[i] !== null) {
			this.matrices.push(new Matrix(matrices[i]));
		} else {
			this.matrices.push(new Matrix());
		}
		
	}
};

Board.prototype.getValuesForColumn = function getValuesForColumn(column) {
	column = column - 1; // In reality we use index from 0 - 8 but for the API is 1 - 9

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
	row = row - 1; // In reality we use index from 0 - 8 but for the API is 1 - 9

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

Board.prototype.render = function render() {
	var html = '<div class="sudoku-board">';
	this.matrices.forEach(function(matrix) {
		html += matrix.render();
	});
	html += '</div>';

	return html;
};

module.exports = Board;