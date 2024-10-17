const http2 = require('http2');
const fs = require('fs');
const path = require('path');

// Create a HTTP/2 server
const server = http2.createSecureServer({
  key: fs.readFileSync('certs/localhost-privkey.pem'),
  cert: fs.readFileSync('certs/localhost-cert.pem')
});

server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
  const reqPath = headers[':path'];
  
  // Serve the index.html page
  if (reqPath === '/') {
    stream.respond({
      'content-type': 'text/html',
      ':status': 200
    });
    stream.end(fs.readFileSync('index.html'));
  } 
  // Serve the JavaScript file
  else if (reqPath === '/script.js') {
    stream.respond({
      'content-type': 'application/javascript',
      ':status': 200
    });
    stream.end(fs.readFileSync('script.js'));
  } 
  // Serve the image (same image for all requests)
  else if (reqPath.startsWith('/image')) {
    const imagePath = path.join(__dirname, 'images', 'image.png'); 
    stream.respond({
      'content-type': 'image/png',
      ':status': 200
    });
    stream.end(fs.readFileSync(imagePath));
  } 
  else {
    stream.respond({ ':status': 404 });
    stream.end('Not found');
  }
});

server.listen(8443, () => {
    console.log('HTTP/2 server running at https://localhost:8443');
  })
