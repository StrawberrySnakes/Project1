
const sendJSON = (request, response, statusCode, obj) => {
    const responseJSON = JSON.stringify(obj);
    
    response.writeHead(statusCode, {
        'Content-Type' : 'application/json',
        'Content-Length' : Buffer.byteLength(responseJSON),
    });

    if(request.method !== 'HEAD') {
        response.write(responseJSON);
    }
    response.end();
}

module.exports = {
    sendJSON
}