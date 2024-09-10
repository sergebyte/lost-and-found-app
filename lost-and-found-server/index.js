const http = require("http");
const cors = require("cors");
const express = require("express");

const app = express();
const hostname = "127.0.0.1"; // Listen on all network interfaces
const port = 3000;

// Use the CORS middleware
app.use(cors());

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
