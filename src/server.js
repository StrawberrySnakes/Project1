// server.js - main entry point for the server, sets up the HTTP server and routes requests to the router
const http = require('http');
const url = require('url');
const router = require('./router');
const loadData = require('./utils/loadData');

const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

const data = loadData();

// handles incoming requests, parses the URL, and routes the request to the correct handler
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  router(request, response, parsedUrl, data);
};

// Creates the HTTP server and starts listening
http.createServer(onRequest).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
