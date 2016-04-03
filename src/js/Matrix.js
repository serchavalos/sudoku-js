var Cell = require('./Cell.js');

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