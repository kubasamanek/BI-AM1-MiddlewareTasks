const http = require('http');
const fs = require('fs');
const path = require('path');

// Create a HTTP/1.x server
const server = http.createServer((req, res) => {
  const reqPath = req.url;

  // Serve the index.html page
  if (reqPath === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync('index.html'));
  } 
  // Serve the JavaScript file
  else if (reqPath === '/script.js') {
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    res.end(fs.readFileSync('script.js'));
  } 
  // Serve the images (the same image for all requests)
  else if (reqPath.startsWith('/image')) {
    const imagePath = path.join(__dirname, 'images', 'image.png');
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(fs.readFileSync(imagePath));
  } 
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

server.listen(8080, () => {
  console.log('HTTP/1.x server running at http://localhost:8080');
});
