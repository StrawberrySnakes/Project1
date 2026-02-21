const responses = require('../responses.js');

const getAll = (request, response, parsedUrl, content) => {
    return responses.sendJSON(request, response, 200, {
        items: content.items,
    });
};

const getById = (request, response, parsedUrl, content) => {
    const {name} = parsedUrl.query;
    const item = content.items.find((i) => i.name.toLowerCase() === name?.toLowerCase());

    if(!item) {
        return responses.sendJSON(request, response, 404, {
            message : 'Country not found',
            id : 'nonFound',
        });
    }

    return responses.sendJSON(request, response, 200, item);
};

const search = (request, response, parsedUrl, content) => {
    const {name, region} = parsedUrl.query;

    let filtered = content.items;

    if(name) {
        filtered = filtered.filter((i) => i.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (region) {
        filtered = filtered.filter((i) => i.region.toLowerCase() === region.toLowerCase());
    }

    return responses.sendJSON(request, response, 200, {item: filtered});
};

const meta = (request, response, parsedUrl, content) => {
    return responses.sendJSON(request, response, 200, {
        totalItems : content.items.length,
    });
};

module.exports = {
    getAll, 
    getById,
    search, 
    meta
}