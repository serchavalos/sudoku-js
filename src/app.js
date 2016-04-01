var express = require('express');
var mustacheExpress = require('mustache-express');
var Matrix = require('./js/Matrix.js');
var Cell = require('./js/Cell.js');

var app = express();
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views/');

app.get('/', function(req, res) {
  for (var i = 1, values = []; i <= 9; i++) {
    values.push(new Cell(i));
  }
  var matrix = new Matrix(values);

  res.render('index', {matrix: matrix.render()});
});

app.listen(3000);