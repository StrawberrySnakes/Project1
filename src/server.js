const http = require('http');
const url = require('url');
const router = require('./router');
const loadData = require('./utils/loadData');

const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

const data = loadData();

const onRequest = (response, request) => {
    const parsedUrl = url.parse(request.url, true);
    router(request, response, parsedUrl, data);
};

http.createServer(onRequest).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});