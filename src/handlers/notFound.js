// notFound.js - Handler for requests to invalid routes
const responses = require('../responses');

// Handler for any request that doesn't match a valid route
module.exports = (req, res) => responses.sendJSON(req, res, 404, {
  message: 'The page you are looking for was not found.',
  id: 'notFound',
});
