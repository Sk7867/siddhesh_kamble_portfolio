const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif'
};

const server = http.createServer((req, res) =>{
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  let extname = path.extname(filePath);
  let contentType = mimeTypes[extname] || 'text/html';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {  // File not found
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
      } else {  // Other server errors
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
      }
    }else{
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(data)
    }
  })
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});