const express = require('express');
const userRouter = require('./users/users-router');
const server = express();

server.use(express.json());

server.use('/api/users', userRouter);

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: 'not sure what went wrong, but you done goofed.'
  })
})




module.exports = server;
