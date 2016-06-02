var Board = require('./Board.js');
var Keyboard = require('./Keyboard.js');
var DuplicationDetector = require('./DuplicationDetector.js');
var PubSub = require('./PubSub.js');

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

var detector = new DuplicationDetector();
var board = new Board('#board-container', boardValues, detector);
var keyboard = new Keyboard('#keyboard-container');

board.init(PubSub);
keyboard.init(PubSub);

(function render(){
  board.updateView();
  requestAnimationFrame(render);
})();
