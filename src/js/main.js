var Board = require('./Board.js');
var Matrix = require('./Matrix.js');
var Cell = require('./Cell.js');
var Keyboard = require('./Keyboard.js');

var board = new Board('#board-container', [
    null, [1,2,3,4,5,6,7,8,9], null,
    [1,2,3,4,5,6,7,8,9],[1,2,null,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],
    null, [1,2,3,4,5,6,7,8,9], null
    ]
  ),
  keyboard = new Keyboard('#keyboard-container'),
  allCells
;

board.updateView();
allCells = document.querySelectorAll('.sudoku-cell');

document.querySelector('#keyboard-container').addEventListener('click', function(event) {
  event.preventDefault();

  var keyElem;
  if (!(keyElem = event.target).classList.contains('keyboard-key')) {
    return;
  }

  if (keyElem.dataset.keyValue === 'clear') {
    board.clearSelectedCell();
    board.updateView();
    return;
  }

  keyboard.selectNumber(keyElem);
  keyboard.updateView();

  board.setValueOnSelectedCell(keyboard.getSelectedNumber());
  board.updateView();
});

document.querySelector('#board-container').addEventListener('click', function(event) {
  event.preventDefault();

  var cellElem;
  if (!(cellElem = event.target).classList.contains('sudoku-cell')) {
    return;
  }

  board.selectCell(cellElem);

  Array.prototype.forEach.call(allCells, function(cellElem) {
    cellElem.classList.remove('selected');
  });
  cellElem.classList.add('selected');
});
