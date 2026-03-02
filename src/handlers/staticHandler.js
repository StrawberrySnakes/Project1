// staticHandler.js - Handler for serving static files like HTML, CSS, JS, images, etc.
const fs = require('fs');
const path = require('path');

// determines content type based on file extension
const getContentType = (ext) => {
  if (ext === '.html') return 'text/html';
  if (ext === '.css') return 'text/css';
  if (ext === '.js') return 'application/javascript';
  if (ext === '.json') return 'application/json';
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg') return 'image/jpeg';
  return 'text/plain';
};

// serve static files based on the request URL
const serveFile = (request, response, filePath) => {
  const ext = path.extname(filePath);
  // Replacing it wiht a simpler way to implement
  const contentType = getContentType(ext);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('File not found');
      return;
    }

    response.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': data.length,
    });

    if (request.method !== 'HEAD') {
      response.write(data);
    }

    response.end();
  });
};

module.exports = serveFile;
