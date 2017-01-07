var express = require('express');
var openResource = require('open');
var fallback = require('express-history-api-fallback');

var app = express();

var path = __dirname + '/dist/prod';
var index_file = path + '/index.html'
var base = '/';
var port = process.env.Port || 3000;
console.log('Serving from', path);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path));
app.use(fallback(path + 'index.html', { path }));

app.get('/', function(req, res) {
  res.sendFile( path + '/index.html')
})

app.all('*', (req, res) => {
  res.status(200).sendFile(index_file);
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});