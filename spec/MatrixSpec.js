var Cell = require('../src/js/Cell.js');
var Matrix = require('../src/js/Matrix.js');
var IndexError = require('../src/js/exceptions/IndexError.js');
var DuplicatedValueError = require('../src/js/exceptions/DuplicatedValueError.js');

describe('A matrix', function(){
	var matrix;

	beforeEach(function() {
		for (var i = 1, values = []; i <= 9; i++) {
			values.push(new Cell(i));
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

	describe('#getValue', function() {
		it('should return the value', function() {
			expect(matrix.getValue(6)).toEqual(7);
		});

		it('should return null if the cell is empty', function() {
			var matrix = new Matrix();
			expect(matrix.getValue(1)).toBe(null);
		});

		it('should throw an error if the function does not exist', function() {
			expect(function() {
				matrix.getValue(1000);
			}).toThrow(new IndexError());
		});

	});

	describe('#setValue', function() {
		it('should throw an exception if the cell does not exist or new value is not number', function() {
			expect(function() {
				matrix.setValue('111', 1);
			}).toThrow(new IndexError());

			expect(function() {
				matrix.setValue(1, null);
			}).toThrowError();
		});

		it('should throw an exception if the value of a cell is repated', function() {
			expect(function() {
				matrix.setValue(0, 1);
				matrix.setValue(1, 1);
			}).toThrow(new DuplicatedValueError());
		});
	});

	describe('#getValues', function () {
		it('should get the list of values added', function() {
			expect(matrix.getValues()).toEqual([1,2,3,4,5,6,7,8,9]);
		});
	});

  describe('#render', function() {
    beforeEach(function() {
      for (var i = 1, cellsArr = []; i <= 9; i++) {
        cellsArr.push(new Cell(i));
      }
      matrix = new Matrix(cellsArr);
    });

    it('should return a view of a matrix and update its value', function() {
      var expectedHtml = '<div>';
      for (var i = 1; i <= 9; i++) {
        expectedHtml += '<div>' + i + '</div>'
      }
      expectedHtml += '</div>';

      expect( matrix.render() ).toEqual( expectedHtml );
    });
  });

});