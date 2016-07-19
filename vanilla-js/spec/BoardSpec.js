var Board = require('../src/js/Board.js');
var PubSub = require('../src/js/vendor/PubSub.js');

describe('Board', () => {
  var board, fullBoard, containerElem;
  beforeEach(() => {
    document.write('<html><body><div id="board-container" class="board-container"></div></body></html>');

    for (var i = 0, cells = []; i < 82; i++) {
      cells.push(i); // Whatever value....
    }
    board = new Board('#board-container', cells, PubSub);
    board.init();
  });

  describe('#init', () => {
    it('should return a view for board',  () => {
      containerElem = document.getElementById('board-container');

      expect( containerElem.querySelectorAll('div.sudoku-cell').length ).toBe(81);
    });
  });

  // TODO: Let's remove this method (it's private, it should not be tested like
  //       this) and add more where Board::_isComplete is executed
  describe('#_isComplete', () => {
    it('should return true for a full board', () => {
      for (var i = 0, cells = []; i < 82; i++) {
        cells.push(9); // Whatever value....
      }
      fullBoard = new Board('#board-container', cells);

      expect( fullBoard._isComplete() ).toBe(true);
    });

    it('should return false for a uncomplete board', () => {
      expect( board._isComplete() ).toBe(false);
    });
  });
});
