var Board = require('./Board.js');
var Keyboard = require('./Keyboard.js');
var DuplicationDetector = require('./DuplicationDetector.js');

var boardValues = [
    3, 9, 6, 4, 5, 1, null, 7, 8,
    8, 5, 1, 7, null, 3, 6, 4, 9,
    4, null, 7, 6, 8, 9, 5, 3, 1,
    6, 7, 8, 9, 1, 4, 3, null, 5,
    null, 1, 9, 3, 7, 5, 8, 6, 4,
    5, 4, 3, 8, 6, null, 1, 9, 7,
    9, 8, null, 1, 4, 6, 7, 5, 3,
    7, 3, 5, null, 9, 8, 4, 1, 6,
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
