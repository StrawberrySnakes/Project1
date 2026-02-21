const fs = require('fs');
const querystring = require('querystring');


const parseBody = (request, path) => {
    let body = '';

    request.on('data', (chunk) => {
        body += chunk;
    });

    request.on('end', () => {

        if(body.length == 0) {
            return callback({});
        }

        const contentType = request.headers['content-type'];

        try {
            if(contentType == 'application/json') {
                callback(JSON.parse(body));
            } else {
                callback(querystring.parse(body));
            }
        } catch (e) {
            callback({});
        }
    });
};

module.exports = {
    parseBody
}