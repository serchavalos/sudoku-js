var Board = require('./Board.js');
var Matrix = require('./Matrix.js');
var Cell = require('./Cell.js');

window.board = new Board([
  null, [1,2,3,4,5,6,7,8,9], null,
  [1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],
  null, [1,2,3,4,5,6,7,8,9], null
  ]
);

document.querySelector('#wrapper').innerHTML = board.render();