const mime = require('mime');

var path = require('path');


var extractContentType = function (url) {
  var filePath;
  var contentType = 'text/html';
  var fileName = 'index.html';

  if (url.length > 1) {
    fileName = url.substring(1);
    contentType = mime.getType(fileName.split('.').pop());
  }

  return contentType;

};

module.exports = extractContentType;
