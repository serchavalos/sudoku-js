let Board = require('./Board.js');
let Keyboard = require('./Keyboard.js');
let DuplicationDetector = require('./DuplicationDetector.js');
let PubSub = require('./vendor/PubSub.js');

let boardValues = [
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

let detector = new DuplicationDetector('.game-resolved-overlay', PubSub);
let board = new Board('#board-container', boardValues, PubSub);
let keyboard = new Keyboard('#keyboard-container', PubSub);

detector.init();
board.init();
keyboard.init();

document.addEventListener('keyup', event => {
  let keyCode = event.keyCode;
  if (keyCode < 48 || keyCode > 57) {
    return;
  }
  let number = keyCode - 48;
  PubSub.publish('on-number-key-pressed', number);
});

(function render(){
  board.updateView();
  detector.updateView();

  requestAnimationFrame(render);
})();
