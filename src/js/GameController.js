var Board = require('./Board.js');
var Matrix = require('./Matrix.js');
var Cell = require('./Cell.js');
var Keyboard = require('./Keyboard.js');
var DuplicationDetector = require('./DuplicationDetector.js');

var GameController = function GameController(idBoard, boardValues, idKeyboard) {
  this.board = new Board(idBoard, boardValues);
  this.keyboard = new Keyboard(idKeyboard);
  this.detector = new DuplicationDetector();
  this.allCells;
};

GameController.prototype.init = function init() {
  this.board.updateView();
  this.allCells = document.querySelectorAll('.sudoku-cell');

  this.board.onClick( this.onBoardClicked.bind(this) );
  this.keyboard.onClick( this.onKeyboardClicked.bind(this) );
};

GameController.prototype.onKeyboardClicked = function onKeyboardClicked(event) {
  event.preventDefault();

  var keyElem;
  if (!(keyElem = event.target).classList.contains('keyboard-key')) {
    return;
  }

  if (keyElem.dataset.keyValue === 'clear') {
    this.board.clearSelectedCell();
    this.board.updateView();
    return;
  }

  this.keyboard.selectNumber(keyElem);
  this.keyboard.updateView();

  var number = this.keyboard.getSelectedNumber();
  this.board.setValueOnSelectedCell(number);
  this.detector.updateFromBoard(this.board);

  if (this.board.isComplete() && this.detector.hasDuplicatedValues() === false) {
    this.board.markAsResolved();
  }

  this.board.updateView();
};

GameController.prototype.onBoardClicked = function onBoardClicked(event) {
  event.preventDefault();

  var cellElem;
  if (!(cellElem = event.target).classList.contains('sudoku-cell')) {
    return;
  }

  this.board.selectCell(cellElem);
  this.board.updateView();

  Array.prototype.forEach.call(this.allCells, function(cellElem) {
    // It seems that classList API is too slow with 81 elements...
    cellElem.className = cellElem.className.replace(/selected/, '');
  });
  cellElem.className += ' selected';

};

module.exports = GameController;