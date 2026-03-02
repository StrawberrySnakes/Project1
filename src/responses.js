//responses.js - for sending JSON responses
const sendJSON = (request, response, statusCode, obj) => {

  if (statusCode === 204) {
    response.writeHead(204);
    return response.end();
  }
  const responseJSON = JSON.stringify(obj || {});

  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(responseJSON),
  });

  if (request.method !== 'HEAD') {
    response.write(responseJSON);
  }
  response.end();
};

module.exports = {
  sendJSON,
};
