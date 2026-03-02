// getHandlers.js - Handlers for GET requests to various endpoints
const responses = require('../responses');

// For GET requests to /items and /item endpoints
const getAll = (request, response, parsedUrl, content) => {
  responses.sendJSON(request, response, 200, {
    items: content.items,
  });
};

// For GET request to /item endpoint with query parameter 'name'
const getById = (request, response, parsedUrl, content) => {
  const { name } = parsedUrl.query;
  const item = content.items.find((i) => i.name.toLowerCase() === name?.toLowerCase());

  if(!name) {
    return responses.sendJSON(request, response, 400, {
      message: 'Name parameter is required',
      id: 'missingName',
    });
  }

  if (!item) {
    return responses.sendJSON(request, response, 404, {
      message: 'Country not found',
      id: 'nonFound',
    });
  }

  return responses.sendJSON(request, response, 200, item);
};

// For GET request to /search endpoint with query parameters 'name' and 'region'
const search = (request, response, parsedUrl, content) => {
  // testing
  console.log('\n--- SERVER: /search endpoint hit! ---');
  const { name, region } = parsedUrl.query;
  console.log(`Query Params -> name: "${name}", region: "${region}"`);

  let filtered = content.items;
  console.log(`Server starting with ${filtered ? filtered.length : 'UNDEFINED'} items.`);

  // no data at all => return empty
  if (!filtered) {
    console.log('Server Error: content.items is missing!');
    return responses.sendJSON(request, response, 200, { items: [] });
  }

  if (name) {
    filtered = filtered.filter((i) => i.name && i.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (region) {
    filtered = filtered.filter((i) => i.region && i.region.toLowerCase() === region.toLowerCase());
  }

  console.log(`Server sending back ${filtered.length} items.`);
  return responses.sendJSON(request, response, 200, { items: filtered });
};

// For GET request to /meta endpoint to return metadata about the items
const meta = (request, response, parsedUrl, content) => responses.sendJSON(request, response, 200, {
  totalItems: content.items.length,
});


module.exports = {
  getAll,
  getById,
  search,
  meta,
};
