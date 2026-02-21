const responses = require('../responses.js');

const getAll = (request, response, parsedUrl, content) => {
    return responses.sendJSON(request, response, 200, {
        items: content.items,
    });
};

const getById = (request, response, parsedUrl, content) => {
    const {id} = parsedUrl.query;

    if(!id) {
        return responses.sendJSON(request, response, 400 , {
            message : 'Missing id parameters',
            id : 'badRequest',
        });
    }

    if(!item) {
        return responses.sendJSON(request, response, 404, {
            message : 'Item not found',
            id : 'nonFound',
        });
    }

    return response.sendJSON(request, response, 200, item);
};

const search = (request, response, parsedUrl, content) => {
    const {name} = parsedUrl.query;
    const filtered = name ? content.items.filter((i) => i.name.includes(name)) : content.items;
    return responses.sendJSON(request, response, 200, {
        items: filtered,
    });
};

const meta = (request, response, parsedUrl, content) => {
    return responses.sendJSON(request, response, 200, {
        totalItems : content.item.length,
    });
};

module.exports = {
    getAll, 
    getById,
    search, 
    meta
}