//responses.js - for sending JSON responses
const sendJSON = (request, response, statusCode, obj) => {
  //Dont need it to always send a body like for 204 reponse.
  const responseJSON = obj ? JSON.stringify(obj) : '';

  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(responseJSON),
  });

  if (request.method !== 'HEAD' && responseJSON.length > 0) {
    response.write(responseJSON);
  }
  response.end();
};

module.exports = {
  sendJSON,
};
