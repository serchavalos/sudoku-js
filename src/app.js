var express = require('express');
var mustacheExpress = require('mustache-express');
var Board = require(__dirname + '/js/Board.js');
var Matrix = require(__dirname + '/js/Matrix.js');
var Cell = require(__dirname + '/js/Cell.js');

var app = express();
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views/');
app.use(express.static(__dirname + '/public/'));

var cells, matrices, board;

for (var i = 0, cells = []; i < 9; i++) {
  cells.push(new Cell(i + 1));
}

for (var i = 0, matrices = []; i < 9; i++) {
  matrices.push(new Matrix(cells));
};

board = new Board(matrices);

app.get('/', function(req, res) {
  res.render('index', {board: board.render()});
});

app.listen(3000);