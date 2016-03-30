var Cell = require('./cell.js');

var Matrix = function Matrix(values) {
	this.cells = [];
	for (var i = 0, value = null; i < 9; i++) {
		value = typeof values[i] != 'undefined' ? values[i].getValue() : null;
		this.cells[i] = new Cell(value);
	}
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

Matrix.prototype.setValueOn = function setValueOn(index, value) {
	if (typeof this.cells[index] === 'undefined') {
		throw new Error('Invalid cell index');
	}

	var values = this.getValues();
	if (values.indexOf(value) > -1) {
		throw new Error('Duplicated value added of value "' + value + '"')
	}

	this.cells[index].setValue(value);
};

module.exports = Matrix;