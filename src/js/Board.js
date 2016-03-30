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
	this.matrices = matrices
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

module.exports = Board;