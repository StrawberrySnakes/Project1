const fs = require('fs');
const querystring = require('querystring');


const parseBody = (request, path) => {
    let body = '';

    request.on('data', (chunk) => {
        body += chunk;
    });

    request.on('end', () => {
        const contentType = request.headers['content-type'];

        if(contentType == 'application/json') {
            callback(JSON.parse(body));
        } else if (contentType == 'application/x-www-form-urlencoded') {
            callback(querystring.parse(body));
        } else {
            callback({});
        }
    });
};

module.exports = {
    parseBody
}