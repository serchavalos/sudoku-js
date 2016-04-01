var Matrix = require('./Matrix');
var IndexError = require('./exceptions/IndexError.js');
var DuplicatedValueError = require('./exceptions/DuplicatedValueError.js');

var Board = function Board(matrices){
	this.columnIndices = [
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
	];
	this.rowIndices = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
	];

	this.matrices = [];
	for (var i = 0, matrix = null; i < 9; i++) {
		matrix = matrices && /Matrix/.test(matrices[i].constructor) ? matrices[i] : new Matrix();
		this.matrices[i] = matrix;
	}
};

Board.prototype.getValuesForColumn = function getValuesForColumn(column) {
	var allValues = [];
	var index = (column - 1) % 3;
	var range = this.columnIndices[parseInt(index/3)];

	this.matrices.forEach(function(matrix, count) {
		if (range.indexOf(count) < 0) {
			return;
		}

		var values = matrix.getValues();

		allValues.push(values[index]);
		allValues.push(values[index + 3]);
		allValues.push(values[index + 6]);
	});

	return allValues;
};
Board.prototype.getValuesForRow = function getValuesForRow(row) {
	var allValues = [];
	var index = (row - 1) % 3;
	var range = this.rowIndices[parseInt(index/3)];

	this.matrices.forEach(function(matrix, count) {

		if (range.indexOf(count) < 0) {
			return;
		}

		var values = matrix.getValues();
		var newIndex = [1,4,7].indexOf(row) > -1 ? 0 :
			[2,5,8].indexOf(row) > -1 ? 3 :
			6
		;

		allValues.push(values[newIndex]);
		allValues.push(values[newIndex + 1]);
		allValues.push(values[newIndex + 2]);
	});

	return allValues;
};

Board.prototype.getValue = function getValue(col, row) {
	var matrix = this.matrices[row - 1];

	return matrix.getValue(col - 1);
};

Board.prototype.setValue = function setValue(col, row, value) {
	if (typeof this.matrices[row - 1] === 'undefined') {
		throw new Error('Invalid column given. Provide numbers between 1 - 9');
	}

	var matrix = this.matrices[row - 1];
	
	try {
		matrix.setValue(col - 1, value);
	} catch (err) {
		if (err instanceof IndexError) {
			throw new Error('Invalid row given. Provide numbers between 1 - 9');
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