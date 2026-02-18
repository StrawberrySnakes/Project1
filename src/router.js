const getHandlers = require('./handlers/getHandlers');
const postHandlers = require('./handlers/postHandlers');
const noFound = require('./handlers/notFound');

const router = (request, response, parsedUrl, content) => {
    const {pathname} = parsedUrl;

    if(request.method == "GET" || request.method == "HEAD") {
        if(pathname == '/getAll') {
            return getHandlers.getAll(request, response, parsedUrl, content);
        } else if (pathname == '/search') {
            return getHandlers.search(request, response, parsedUrl, content);
        } else if (pathname == '/getById') {
            return getHandlers.getById(request, response, parsedUrl, content);
        } else if (pathname == '/meta') {
            return getHandlers.meta(request, response, parsedUrl, content);
        }
    }

    // Post
    if(request.method = 'POST') {
        if(pathname == '/addItem') {
            return postHandlers.addItem(request. response, content);
        } else if(pathname == '/editItem') {
            return postHandlers.editItem(request. response, content);
        }
    }

    return notFound(request, response);
}