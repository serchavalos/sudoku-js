var Cell = function Cell(value) {
	this.editable = true;

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
	var text = this.value !== null ?  this.value : '';
	var css = (this.value === null !== null ? 'value-' + this.value : '')
		+ (this.editable ? '' : ' fixed');

	return '<div class="sudoku-cell ' + css + '" ' + dataAttr + '>' + text + '</div>';
};

module.exports = Cell;