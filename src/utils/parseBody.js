const fs = require('fs');
const querystring = require('querystring');


const parseBody = (request, path) => {
    let body = '';

    request.on('data', (chunk) => {
        body += chunk;
    });

    request.on('end', () => {

        if(body.length == 0) {
            return path({});
        }

        const contentType = request.headers['content-type'];

        try {
            if(contentType == 'application/json') {
                path(JSON.parse(body));
            } else {
                path(querystring.parse(body));
            }
        } catch (e) {
            path({});
        }
    });
};

module.exports = parseBody;
