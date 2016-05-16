var Board = require('./Board.js');
var Keyboard = require('./Keyboard.js');
var DuplicationDetector = require('./DuplicationDetector.js');

var boardValues = [
    3, 9, 6, 4, 5, 1, 2, 7, 8,
    8, 5, 1, 7, 2, 3, 6, 4, 9,
    4, 2, 7, 6, 8, 9, 5, 3, 1,
    6, 7, 8, 9, 1, 4, 3, 2, 5,
    2, 1, 9, 3, 7, 5, 8, 6, 4,
    5, 4, 3, 8, 6, 2, 1, 9, 7,
    9, 8, 2, 1, 4, 6, 7, 5, 3,
    7, 3, 5, 2, 9, 8, 4, 1, 6,
    1, 6, 4, 5, 3, 7, 9, 8, null
];

var board = new Board(document, '#board-container', boardValues);
var keyboard = new Keyboard(document, '#keyboard-container');
var detector = new DuplicationDetector();

board.init();
keyboard.init();

// Setup events
document.addEventListener('on-clear-pressed', function(event) {
    board.clearSelectedCell();
    board.updateView();
});

document.addEventListener('on-number-pressed', function(event) {
  event.preventDefault();

  var number = event.attr.pressedNumber;
  board.setValueOnSelectedCell(number);

  if (board.isComplete() && detector.hasDuplicatedValues(board) === false) {
    board.markAsResolved();
  }

  board.updateView();
});

// Render view
board.updateView();
