var Cell = require('../src/js/Cell.js');
var Board = require('../src/js/Board.js');
var PubSub = require('../src/js/PubSub.js');
var fs = require('fs');

describe('Board', function() {
  var board, fullBoard, containerElem;
  var selectCell = function(index) {
    return document.querySelector('div.sudoku-cell[data-index="' + index +'"]');
  };

  beforeEach(function() {
    document.write('<html><body><div id="board-container" class="board-container"></div></body></html>');

    board = new Board(
      '#board-container',
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
      ]
    );

    board.init(PubSub);
  });

  describe('#init', function() {
    it('should return a view for board',  function() {
      containerElem = document.getElementById('board-container');

      expect( containerElem.querySelectorAll('div.sudoku-cell').length ).toBe(81);
    });
  });

  describe('#isComplete', function() {
    it('should return true for a full board', function() {
      for (var i = 0, cells = []; i < 82; i++) {
        cells.push(9); // Whatever value....
      }
      fullBoard = new Board('#board-container', cells);

      expect( fullBoard.isComplete() ).toBe(true);
    });

    it('should return false for a uncomplete board', function() {
      expect( board.isComplete() ).toBe(false);
    });
  });

  describe('#getCurrentColumnValues', function() {
    it('should return the current values of the selected column', function() {
      selectCell(0).click();
      expect( board.getCurrentRowValues() ).toEqual([null,null,null,null,null,null,null,null,null]);

      selectCell(40).click();
      expect( board.getCurrentRowValues() ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

  });

  describe('#getCurrentRowValues', function() {
    it('should return the current values of the selected row', function() {
      selectCell(0).click();
      expect( board.getCurrentColumnValues() ).toEqual([null, 1, null, 1, 1, 1, null, 1,null]);

      selectCell(4).click();
      expect( board.getCurrentColumnValues() ).toEqual([null, 5, null, 5, 5, 5, null, 5, null]);

    });

  });

  describe('#getCurrentMatrixValues', function() {
    it('should return the current values of the selected matrix', function() {
      selectCell(9).click();
      expect( board.getCurrentMatrixValues() ).toEqual([null, null, null, 1, 2, 3, null, null, null]);

      selectCell(0).click();
      expect( board.getCurrentMatrixValues() ).toEqual([null, null, null, 1, 2, 3, null, null, null]);

      selectCell(19).click();
      expect( board.getCurrentMatrixValues() ).toEqual([null, null, null, 1, 2, 3, null, null, null]);

      selectCell(30).click();
      expect( board.getCurrentMatrixValues() ).toEqual([4, 5, 6, 4, 5, 6, 4, 5, 6]);

      selectCell(40).click();
      expect( board.getCurrentMatrixValues() ).toEqual([4, 5, 6, 4, 5, 6, 4, 5, 6]);

      selectCell(50).click();
      expect( board.getCurrentMatrixValues() ).toEqual([4, 5, 6, 4, 5, 6, 4, 5, 6]);
    });

  });
});
