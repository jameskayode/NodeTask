const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const filePath = path.join(__dirname, './html/home.html');
    servePage(filePath, res);
  }
  else if (req.url === '/about') {
    const filePath = path.join(__dirname, './html/about.html');
    servePage(filePath, res);
  }
  else if (req.url === '/contact') {
    const filePath = path.join(__dirname, './html/contact.html');
    servePage(filePath, res);
  }
  else {
    res.writeHead(404);
    const filePath = path.join(__dirname, './html/notfound.html');
    servePage(filePath, res);
  }
});

function servePage(filePath, res) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
