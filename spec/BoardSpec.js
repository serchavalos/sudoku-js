var Cell = require('../src/js/Cell.js');
var Matrix = require('../src/js/Matrix.js');
var Board = require('../src/js/Board.js');

describe('A board', function() {
	var board;

	beforeEach(function() {
		for (var i = 0, cells = []; i < 9; i++) {
			cells.push(new Cell(i + 1));
		}
		for (var i = 0, matrices = []; i < 9; i++) {
			matrices.push(new Matrix(cells));
		};

/**
	==================================
	| 1 , 2 , 3| 4 , 5 , 6| 7 , 8 , 9|
	| 1 , 2 , 3| 4 , 5 , 6| 7 , 8 , 9|
	| 1 , 2 , 3| 4 , 5 , 6| 7 , 8 , 9|
	==================================
	| 1 , 2 , 3| 4 , 5 , 6| 7 , 8 , 9|
	| 1 , 2 , 3| 4 , 5 , 6| 7 , 8 , 9|
	| 1 , 2 , 3| 4 , 5 , 6| 7 , 8 , 9|
	==================================
	| 1 , 2 , 3| 4 , 5 , 6| 7 , 8 , 9|
	| 1 , 2 , 3| 4 , 5 , 6| 7 , 8 , 9|
	| 1 , 2 , 3| 4 , 5 , 6| 7 , 8 , 9|
	==================================
**/

		board = new Board(matrices);
	});

	it('should be able to return all values for a given column', function() {
		expect( board.getValuesForColumn(1) ).toEqual([1,4,7,1,4,7,1,4,7]);
		expect( board.getValuesForColumn(2) ).toEqual([2,5,8,2,5,8,2,5,8]);
		expect( board.getValuesForColumn(3) ).toEqual([3,6,9,3,6,9,3,6,9]);

		expect( board.getValuesForColumn(4) ).toEqual([1,4,7,1,4,7,1,4,7]);
		expect( board.getValuesForColumn(8) ).toEqual([2,5,8,2,5,8,2,5,8]);
		expect( board.getValuesForColumn(9) ).toEqual([3,6,9,3,6,9,3,6,9]);

	});

	it('should be able to return all values for a given row', function() {
		expect( board.getValuesForRow(1) ).toEqual([1,2,3,1,2,3,1,2,3]);
		expect( board.getValuesForRow(2) ).toEqual([4,5,6,4,5,6,4,5,6]);
		expect( board.getValuesForRow(3) ).toEqual([7,8,9,7,8,9,7,8,9]);

		expect( board.getValuesForRow(4) ).toEqual([1,2,3,1,2,3,1,2,3]);
		expect( board.getValuesForRow(8) ).toEqual([4,5,6,4,5,6,4,5,6]);
		expect( board.getValuesForRow(9) ).toEqual([7,8,9,7,8,9,7,8,9]);

	});

	describe('#getValue', function() {

		it('should be able to get a value in cells', function() {
			expect( board.getValue(1, 1) ).toBe(1);
		});

		it('should be return null if empty', function() {
			var board = new Board();
			expect( board.getValue(2, 2) ).toBe(null);
		});

	});

	describe('#setValue', function() {

		it('should set a value for an existing cell', function() {

			var board = new Board();
			board.setValue(5, 5, 9);
			expect( board.getValue(5, 5)).toBe(9);

		});

		it('should throw an error when setting an unexisting cell', function() {

			expect(function() {

				board.setValue(1, 200, 1);

			}).toThrowError('Invalid column given. Provide numbers between 1 - 9');

			expect(function() {

				board.setValue(100, 2, 1);

			}).toThrowError('Invalid row given. Provide numbers between 1 - 9');

		});

		it('should throw an error when setting an existing cell with a duplicated value', function() {

			expect(function() {

				board.setValue(1, 1, 9);

			}).toThrowError('Invalid value. It is already duplicated');


		});


	});

});
