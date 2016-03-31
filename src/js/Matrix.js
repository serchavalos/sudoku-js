var Cell = require('./cell.js');
var IndexError = require('./exceptions/IndexError.js');
var DuplicatedValueError = require('./exceptions/DuplicatedValueError.js');

var Matrix = function Matrix(values) {
	this.cells = [];
	for (var i = 0, value = null; i < 9; i++) {
		value = values && typeof values[i] != 'undefined' ? values[i].getValue() : null;
		this.cells[i] = new Cell(value);
	}
};

Matrix.prototype.getValue = function getValue(index) {
	if (typeof this.cells[index] === 'undefined') {
		throw new IndexError();
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

Matrix.prototype.setValue = function setValueOn(index, value) {
	if (typeof this.cells[index] === 'undefined') {
		throw new IndexError();
	}

	var values = this.getValues();
	if (values.indexOf(value) > -1) {
		throw new DuplicatedValueError();
	}

	this.cells[index].setValue(value);
};

module.exports = Matrix;