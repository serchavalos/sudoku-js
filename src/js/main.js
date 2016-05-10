var GameController = require('./GameController.js');

var boardValues = [
  null,6,1,8,3,5,2,7,4, 4,3,8,7,2,null,6,5,1, 7,2,5,1,4,6,3,null,8,
  7,1,2,6,4,8,3,5,9, 5,8,6,3,null,2,1,4,7, 4,3,null,5,7,1,6,8,2,
  4,2,6,5,null,7,1,8,3, null,7,5,8,1,3,2,6,4, 8,1,3,2,6,4,null,5,null
];

var controller = new GameController(document, '#board-container', boardValues, '#keyboard-container');

controller.init();