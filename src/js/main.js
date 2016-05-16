var GameController = require('./GameController.js');

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

var controller = new GameController(document, '#board-container', boardValues, '#keyboard-container');

controller.init();
