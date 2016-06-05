describe('A cell', () => {
	var Cell = require('../src/js/Cell.js');
	var cell;

	beforeEach(() => {
		cell = new Cell();
	});


	describe('#getValue', () => {
		it('should keep a value', () => {
			cell = new Cell(0, 4);
			expect(cell.getValue()).toEqual(4);
		});

		it('should be able to add new values', () => {
			cell.setValue(9);
			expect(cell.getValue()).toEqual(9);
		});

		it('should keep a value of null if an incorrect value is given', () => {
			expect((new Cell(100000)).getValue()).toBe(null);
			expect((new Cell(null)).getValue()).toBe(null);
			expect((new Cell('sergio')).getValue()).toBe(null);
		});
	});

	describe('#isEmpty', () => {
		it('should indicate if it is empty', () => {
			expect(cell.isEmpty()).toBe(true);
			cell.setValue(2);
			expect(cell.isEmpty()).toBe(false);
		});
	});

	describe('#setValue', () => {
		it('should throw an exception if set value is not a number', () => {
			expect(() => {
				cell.setValue('a');
			}).toThrowError('Invalid value given. Enter a number');

			expect(() => {
				cell.setValue(null);
			}).toThrowError('Invalid value given. Enter a number');
		});

		it('should throw an exception if set value is not between 1 and 9', () => {
			expect(() => {
				cell.setValue(0);
			}).toThrowError('Invalid value given. Enter a number between 1 and 9');

			expect(() => {
				cell.setValue(1000);
			}).toThrowError('Invalid value given. Enter a number between 1 and 9');
		});
	});

  describe('#getElement', () => {
    it('should return a view of a cell', () => {
      cell.setValue(6);
      var html = cell.getElement().outerHTML;
      expect( html ).toEqual('<div class="sudoku-cell m-odd value-6" data-index="0">6</div>');
    });

    it('should update the view when a cell is updated', () => {
      cell.setValue(8);
      var html = cell.getElement().outerHTML;
      expect( html ).toEqual('<div class="sudoku-cell m-odd value-8" data-index="0">8</div>');

      cell.setValue(9);
      html = cell.getElement().outerHTML;
      expect( html ).toEqual('<div class="sudoku-cell m-odd value-9" data-index="0">9</div>');
    });

    it('should return a view of an empty cell', () => {
      var html = (new Cell()).getElement().outerHTML;
      expect( html ).toEqual('<div class="sudoku-cell m-odd" data-index="0">&nbsp;</div>');
    });
  });

	afterEach(() => {
		cell = null;
	});
});
