const path = require('path');
const serveFile = require('./handlers/staticHandler');
const getHandlers = require('./handlers/getHandlers');
const postHandlers = require('./handlers/postHandlers');
const notFound = require('./handlers/notFound');

const router = (request, response, parsedUrl, content) => {
  const { pathname } = parsedUrl;

  if (request.method === 'GET' || request.method === 'HEAD') {
    if (pathname === '/getAll') return getHandlers.getAll(request, response, parsedUrl, content);
    if (pathname === '/search') return getHandlers.search(request, response, parsedUrl, content);
    if (pathname === '/getById') return getHandlers.getById(request, response, parsedUrl, content);
    if (pathname === '/meta') return getHandlers.meta(request, response, parsedUrl, content);

    // Static Files
    if (pathname === '/' || pathname === '/index.html') {
      return serveFile(request, response, path.join(__dirname, '../client/index.html'));
    }
    if (pathname === '/docs') {
      return serveFile(request, response, path.join(__dirname, '../client/docs.html'));
    }
    if (pathname.startsWith('/css') || pathname.startsWith('/js')) {
      return serveFile(request, response, path.join(__dirname, `../client${pathname}`));
    }
  }

  if (request.method === 'POST') {
    if (pathname === '/addItem') return postHandlers.addItem(request, response, content);
    if (pathname === '/editItem') return postHandlers.editItem(request, response, content);
  }

  return notFound(request, response);
};

module.exports = router;
