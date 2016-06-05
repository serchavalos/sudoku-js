var Matrix = require('../src/js/Matrix.js');

describe('A Matrix', () => {
  var matrix, cellsValues =
    [
           /*  0  , 1  , 2  , 3  , 4  , 5  , 6  , 7  , 8  */
    /* 0 */ null,null,null,null,null,null,null,null,null,
    /* 1 */  1  , 2  , 3  , 4  , 5  , 6  , 7  , 8  , 9  ,
    /* 2 */ null,null,null,null,null,null,null,null,null,
    /* 3 */  1  , 2  , 3  , 4  , 5  , 6  , 7  , 8  , 9  ,
    /* 4 */  1  , 2  , 3  , 4  , 5  , 6  , 7  , 8  , 9  ,
    /* 5 */  1  , 2  , 3  , 4  , 5  , 6  , 7  , 8  , 9  ,
    /* 6 */ null,null,null,null,null,null,null,null,null,
    /* 7 */  1  , 2  , 3  , 4  , 5  , 6  , 7  , 8  , 9  ,
    /* 8 */ null,null,null,null,null,null,null,null,null,
    ];

  describe('#getCurrentColumnValues', () => {
    it('should return the current values of the selected column', () => {
      matrix = new Matrix(cellsValues, 0);
      expect( matrix.getCurrentRowValues() ).toEqual([null,null,null,null,null,null,null,null,null]);

      matrix = new Matrix(cellsValues, 40);
      expect( matrix.getCurrentRowValues() ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

  });

  describe('#getCurrentRowValues', () => {
    it('should return the current values of the selected row', () => {
      matrix = new Matrix(cellsValues, 0);
      expect( matrix.getCurrentColumnValues() ).toEqual([null, 1, null, 1, 1, 1, null, 1,null]);

      matrix = new Matrix(cellsValues, 4);
      expect( matrix.getCurrentColumnValues() ).toEqual([null, 5, null, 5, 5, 5, null, 5, null]);

    });

  });

  describe('#getCurrentMatrixValues', () => {
    it('should return the current values of the selected matrix', () => {
      matrix = new Matrix(cellsValues, 9);
      expect( matrix.getCurrentMatrixValues() ).toEqual([null, null, null, 1, 2, 3, null, null, null]);

      matrix = new Matrix(cellsValues, 0);
      expect( matrix.getCurrentMatrixValues() ).toEqual([null, null, null, 1, 2, 3, null, null, null]);

      matrix = new Matrix(cellsValues, 19);
      expect( matrix.getCurrentMatrixValues() ).toEqual([null, null, null, 1, 2, 3, null, null, null]);

      matrix = new Matrix(cellsValues, 30);
      expect( matrix.getCurrentMatrixValues() ).toEqual([4, 5, 6, 4, 5, 6, 4, 5, 6]);

      matrix = new Matrix(cellsValues, 40);
      expect( matrix.getCurrentMatrixValues() ).toEqual([4, 5, 6, 4, 5, 6, 4, 5, 6]);

      matrix = new Matrix(cellsValues, 50);
      expect( matrix.getCurrentMatrixValues() ).toEqual([4, 5, 6, 4, 5, 6, 4, 5, 6]);
    });
  });
});
