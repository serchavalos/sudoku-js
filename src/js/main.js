var Board = require('./Board.js');
var Matrix = require('./Matrix.js');
var Cell = require('./Cell.js');
var Keyboard = require('./Keyboard.js');
var DuplicationDetector = require('./DuplicationDetector.js');

var board = new Board('#board-container', [
    [9,6,1,8,3,5,2,7,4], [4,3,8,7,2,9,6,5,1], [7,2,5,1,4,6,3,9,8],
    [7,1,2,6,4,8,3,5,9], [5,8,6,3,9,2,1,4,7], [4,3,9,5,7,1,6,8,2],
    [4,2,6,5,9,7,1,8,3], [9,7,5,8,1,3,2,6,4], [8,1,3,2,6,4,9,5,null]
    ]
  ),
  keyboard = new Keyboard('#keyboard-container'),
  detector = new DuplicationDetector(),
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

  var number = keyboard.getSelectedNumber();
  board.setValueOnSelectedCell(number);
  detector.updateFromBoard(board);
  board.updateView();

  if (board.isComplete() && detector.hasDuplicatedValues() === false) {
    console.log('Game over!');
  }
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
