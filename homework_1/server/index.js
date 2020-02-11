const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const sendResponse = (res, status, mimeType, pathname, data) => {
    res.writeHead(status, data ? `File ${pathname} found` : `File ${pathname} not found`, {
            'Content-Type': mimeType || 'text/plain'
        })
        .end(data);
};

const sendFile = (res, pathname, mimeType) => {
    fs.readFile(`../public${pathname}`, (err, buf) => {
        if (err) {
            console.log('Error reading file:\n' + err);
            sendResponse(res, 404, null, pathname, null);
            return;
        }

        sendResponse(res, 200, mimeType, pathname, buf);
    });
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    let pathname = req.url === '/' ? '/index.html' : req.url;
    const fileExtension = path.parse(pathname).ext;

    const map = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
    };

    console.log(pathname);
    fs.stat(`../public${pathname}`, (err, stats) => {
        if (err) {
            console.log('No such file...');
            sendFile(res, '/404.html', 'text/html');
            return;
        }

        sendFile(res, pathname, map[fileExtension]);
    })

});

server.listen(3000);