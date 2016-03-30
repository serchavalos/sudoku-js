var Cell = function Cell(value) {
	try {
		this.setValue(value);
	} catch (err) {
		// Ignore it. At the beginning it's ok to have null
		this.value = null;
	}
};

Cell.prototype.setValue = function(value) {
	if (typeof value != 'number') {
		throw new Error('Invalid value given. Enter a number');
	}
	if (value < 1 || value > 9) {
		throw new Error('Invalid value given. Enter a number between 1 and 9');
	}

	this.value = value;
};

Cell.prototype.getValue = function() {
	return this.value;
};

Cell.prototype.isEmpty = function() {
	return (this.value === null);
}

module.exports = Cell;