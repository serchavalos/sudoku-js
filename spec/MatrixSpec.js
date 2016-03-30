var Cell = require('../src/js/Cell.js');
var Matrix = require('../src/js/Matrix.js');

describe('A matrix', function(){
	var matrix;

	beforeEach(function() {
		for (var i = 0, values = []; i < 9; i++) {
			values.push(new Cell(i + 1));
		}

		matrix = new Matrix(values);
	});

	afterEach(function() {
		matrix = null;
	});

	it('should have the right class', function() {
		expect(/Matrix/.test(matrix.constructor)).toBe(true);
	});

	it('should contain be created with 9 cells', function() {
		var cells = matrix.cells;
		var firstCell = cells[0];

		expect(cells.length).toEqual(9);
		expect(/Cell/.test(firstCell.constructor)).toBe(true);
		expect(firstCell.isEmpty()).toBe(false);
		expect(firstCell.getValue()).toBe(1);
	});

	it('should be able to modify the value of a cell', function() {
		expect(matrix.cells[0].getValue()).toBe(1);
	});

	it('should throw an exception if the cell does not exist or new value is not number', function() {
		expect(function() {
			matrix.setValueOn('111', 1);
		}).toThrowError('Invalid cell index');

		expect(function() {
			matrix.setValueOn(1, null);
		}).toThrowError();
	});

	it('should get the list of values added', function() {
		expect(matrix.getValues()).toEqual([1,2,3,4,5,6,7,8,9]);
	});


	it('should throw an exception if the value of a cell is repated', function() {
		expect(function() {
			matrix.setValueOn(0, 1);
			matrix.setValueOn(1, 1);
		}).toThrowError('Duplicated value added of value "1"');
	});
});