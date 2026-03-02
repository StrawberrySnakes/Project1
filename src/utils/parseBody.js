// parseBody.js - parse the body of POST requests
const querystring = require('querystring');

// Function that Parses the body of a POST request and calls the provided callback with the data
const parseBody = (request, path) => {
  let body = '';

  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', () => {
    if (body.length === 0) {
      path({});
      return;
    }

    const contentType = request.headers['content-type'];

    // Parse the body as JSON if the content type is application/json
    // otherwise parse it as URL-encoded form data
    try {
      if (contentType === 'application/json') {
        path(JSON.parse(body));
      } else {
        path(querystring.parse(body));
      }
    }catch {
      path({});
  }
  });
};

module.exports = parseBody;
