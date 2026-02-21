const responses = require('../responses');

module.exports = (req, res) => responses.sendJSON(req, res, 404, {
  message: 'The page you are looking for was not found.',
  id: 'notFound',
});
