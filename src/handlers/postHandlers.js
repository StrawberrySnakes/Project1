// postHandlers.js - Handlers for POST requests to various endpoints
const parseBody = require('../utils/parseBody');
const responses = require('../responses');

// For POST request to /item endpoint to add a new item
const addItem = (request, response, content) => {
  parseBody(request, (body) => {
    if (!body.name || !body.capital || !body.region) {
      return responses.sendJSON(request, response, 400, {
        message: 'All Fields are Required',
      });
    }

    // keep the new item simple.
    const newItem = {
      id: Date.now().toString(),
      name: body.name,
      capital: body.capital,
      region: body.region,
    };

    content.items.push(newItem);

    // 201 Created
    return responses.sendJSON(request, response, 201, newItem);
  });
};

// For POST request to /item endpoint to edit an existing item
const editItem = (request, response, content) => {
  parseBody(request, (body) => {
    const item = content.items.find((i) => i.id === body.id);

    if (!item) {
      return responses.sendJSON(request, response, 400, {
        message: 'Item not Found',
        id: 'notFound',
      });
    }

    if (body.name) {
      item.name = body.name;
    }

    return responses.sendJSON(request, response, 204, {});
  });
};

module.exports = {
  addItem,
  editItem,
};
