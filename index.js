const http = require('http');
const url = require('url');
const handles = require('./handles');
const qs = require('querystring');

const server = http.createServer(handles.serverHandle);
server.listen(8080);
