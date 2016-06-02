var Board = require('../src/js/Board.js');
var PubSub = require('../src/js/PubSub.js');

describe('Board', function() {
  var board, fullBoard, containerElem;
  beforeEach(function() {
    document.write('<html><body><div id="board-container" class="board-container"></div></body></html>');

    for (var i = 0, cells = []; i < 82; i++) {
      cells.push(i); // Whatever value....
    }
    board = new Board('#board-container', cells, PubSub);
    board.init();
  });

  describe('#init', function() {
    it('should return a view for board',  function() {
      containerElem = document.getElementById('board-container');

      expect( containerElem.querySelectorAll('div.sudoku-cell').length ).toBe(81);
    });
  });

  // TODO: Let's remove this method (it's private, it should not be tested like
  //       this) and add more where Board::_isComplete is executed
  describe('#_isComplete', function() {
    it('should return true for a full board', function() {
      for (var i = 0, cells = []; i < 82; i++) {
        cells.push(9); // Whatever value....
      }
      fullBoard = new Board('#board-container', cells);

      expect( fullBoard._isComplete() ).toBe(true);
    });

    it('should return false for a uncomplete board', function() {
      expect( board._isComplete() ).toBe(false);
    });
  });
});
