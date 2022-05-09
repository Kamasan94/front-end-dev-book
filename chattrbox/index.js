var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var exrtactContentType = require('./contentType');
var wss = require('./websockets-server');


var handleError = function(err, res) {
  res.writeHead(404);

  fs.readFile('app/notfound.html', function (err, data) {
     res.end(data);
  });
}

var server = http.createServer(function (req, res) {
  console.log('Responding to a request.');

  var filePath = extract(req.url);
  var contentType = exrtactContentType(req.url);

  fs.readFile(filePath, function (err, data) {
    if (err) {
      handleError(err, res);
    }
    else {
      res.setHeader('Content-Type', contentType);
      res.end(data);
    }
  });
});
server.listen(3000);
