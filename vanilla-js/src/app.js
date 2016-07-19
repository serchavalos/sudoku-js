var express = require('express');
var mustacheExpress = require('mustache-express');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views/');
app.use(express.static(__dirname + '/../public/'));

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
