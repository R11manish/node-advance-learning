const EventEmitter = require("events");
const http = require("http");

const myEmitter = new EventEmitter();

myEmitter.on("newSale", () => {
  console.log("there was a new sale");
});

myEmitter.on("newSale", () => {
  console.log("custumer name : manish");
});

myEmitter.emit("newSale");

////////////////////////
const server = http.createServer();

server.on("request", (req, res) => {
  console.log("request received");
  console.log(req.url);
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("another request😁😁😁😁");
});

server.on("close", () => {
  console.log("Server closed");
});

server.listen(3000, "127.0.0.1", () => {
  console.log("waiting for request......");
});
