// require your server and launch it
const server = require('./api/server');

server.listen(4321, () => {
    console.log('\n* Server Running on http://localhost:4321 *\n');
})