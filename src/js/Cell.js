var Cell = function Cell(value) {
	this.editable = true;
	this.selected = false;

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
	var value = this.getValue();
	if (value === null) {
		value = '';
	}
	return '<div class="sudoku-cell" ' + dataAttr + '>' + value + '</div>';
};

module.exports = Cell;