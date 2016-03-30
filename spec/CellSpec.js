describe('A cell', function() {
	var Cell = require('../src/js/Cell.js');
	var cell;

	beforeEach(function () {
		cell = new Cell();
	});

	it('should keep a value', function() {
		cell = new Cell(4);
		expect(cell.getValue()).toEqual(4);
	});

	it('should be able to add new values', function() {
		cell.setValue(9);
		expect(cell.getValue()).toEqual(9);
	});

	it('should indicate if it is empty', function() {
		expect(cell.isEmpty()).toBe(true);
		cell.setValue(2);
		expect(cell.isEmpty()).toBe(false);
	});

	it('should throw an exception if set value is not a number', function() {
		expect(function () {
			cell.setValue('a');
		}).toThrowError('Invalid value given. Enter a number');

		expect(function () {
			cell.setValue(null);
		}).toThrowError('Invalid value given. Enter a number');
	});

	it('should keep a value of null if an incorrect value is given', function() {
		expect((new Cell(100000)).getValue()).toBe(null);
		expect((new Cell(null)).getValue()).toBe(null);
		expect((new Cell('sergio')).getValue()).toBe(null);
	});

	it('should throw an exception if set value is not between 1 and 9', function() {
		expect(function () {
			cell.setValue(0);
		}).toThrowError('Invalid value given. Enter a number between 1 and 9');

		expect(function () {
			cell.setValue(1000);
		}).toThrowError('Invalid value given. Enter a number between 1 and 9');
	});

	afterEach(function() {
		cell = null;
	});
});
