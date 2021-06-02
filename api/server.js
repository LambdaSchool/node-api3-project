const express = require("express"); //importing express
const server = express(); //instatiating express
server.use(express.json()); //method to recognize incoming request objects as JSON Object
const { logger } = require("./middleware/middleware"); //middleware functions

// global middlewares and the user's router need to be connected here
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
