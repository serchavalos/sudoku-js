var Cell = require('../src/js/Cell.js');
var Board = require('../src/js/Board.js');
var PubSub = require('../src/js/PubSub.js');
var fs = require('fs');

describe('Board', function() {
  var board, fullBoard, containerElem;

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
  });

  describe('#init', function() {
    it('should return a view for board',  function() {
      // REVIEW: There should be a better way to test a view
      board.init(PubSub);
      containerElem = document.getElementById('board-container');

      expect( containerElem.querySelectorAll('div.sudoku-cell').length ).toBe(81);
    });
  });

  describe('#selectCell', function() {
    it('should select only one cell', function() {
      board.selectCell(0);
      expect( board.selectedIndex ).toBe(0);

      board.selectCell(100);
      expect( board.selectedIndex ).toBe(0);
    });
  });

  describe('#clearSelectedCell', function() {
    it('should clear all the values in the cells', function() {
      board.selectCell(0);
      board.clearSelectedCell();
      // REVIEW: We need a method to get cells from Board (probably get selected cell???)
      // REVIEW: We need a method to get selectedIndex
      expect( board.cells[board.selectedIndex].getValue() ).toBe(null);
    });
  });

  describe('#getSelectedCell', function() {
    it('should return the selected cell', function() {
      board.selectCell(9);
      var selectedCell = board.getSelectedCell();

      expect( selectedCell.getValue() ).toBe(1);
      expect( selectedCell.editable ).toBe(false);
    });

    it('should return null when nothing is selected', function() {
      expect( board.getSelectedCell() ).toBe(null);
    });
  });

  describe('#setValueOnSelectedCell', function() {
    it('should return set the value on the selected cell', function() {
      board.selectCell(0);
      board.setValueOnSelectedCell(4);
      var cell = board.getSelectedCell();

      expect( cell.getValue() ).toEqual(4);
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
      board.selectCell(0);
      expect( board.getCurrentRowValues() ).toEqual([null,null,null,null,null,null,null,null,null]);

      board.selectCell(40);
      expect( board.getCurrentRowValues() ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

  });

  describe('#getCurrentRowValues', function() {
    it('should return the current values of the selected row', function() {
      board.selectCell(0);
      expect( board.getCurrentColumnValues() ).toEqual([null, 1, null, 1, 1, 1, null, 1,null]);

      board.selectCell(4);
      expect( board.getCurrentColumnValues() ).toEqual([null, 5, null, 5, 5, 5, null, 5, null]);

    });

  });

  describe('#getCurrentMatrixValues', function() {
    it('should return the current values of the selected matrix', function() {
      board.selectCell(10);
      expect( board.getCurrentMatrixValues() ).toEqual([null, null, null, 1, 2, 3, null, null, null]);

      board.selectCell(0);
      expect( board.getCurrentMatrixValues() ).toEqual([null, null, null, 1, 2, 3, null, null, null]);

      board.selectCell(19);
      expect( board.getCurrentMatrixValues() ).toEqual([null, null, null, 1, 2, 3, null, null, null]);

      board.selectCell(30);
      expect( board.getCurrentMatrixValues() ).toEqual([4, 5, 6, 4, 5, 6, 4, 5, 6]);

      board.selectCell(40);
      expect( board.getCurrentMatrixValues() ).toEqual([4, 5, 6, 4, 5, 6, 4, 5, 6]);

      board.selectCell(50);
      expect( board.getCurrentMatrixValues() ).toEqual([4, 5, 6, 4, 5, 6, 4, 5, 6]);
    });

  });
});
