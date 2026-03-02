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

    if (!body.name) {
      return responses.sendJSON(request, response, 400, {
        message: 'Name is required to edit an item',
      });
    }

    const item = content.items.find(
          (i) => i.name.toLowerCase() === body.name.toLowerCase()
    );

    if (!item) {
      return responses.sendJSON(request, response, 404, {
        message: 'Country not Found',
        id: 'notFound',
      });
    }

    // Update fields if they are provided in the request body
    if (body.newName) item.name = body.newName;
    if (body.capital) item.capital = body.capital;
    if (body.region) item.region = body.region;
    if (body.currencyName || body.currencySymbol) {
      if (!item.finance) item.finance = {};
      if (body.currencyName) item.finance.currency_name = body.currencyName;
      if (body.currencySymbol) item.finance.currency_symbol = body.currencySymbol;
    }

    return responses.sendJSON(request, response, 200, {message: 'Update successful'});  });
};

module.exports = {
  addItem,
  editItem,
};
