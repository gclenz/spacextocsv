require('dotenv/config');
const server = require('./app');

const port = process.env.PORT;

server.listen(port, () => {
  console.log('The server is running.')
})