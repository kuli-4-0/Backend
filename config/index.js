require('dotenv').config();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

module.exports = {
  host: process.env.HOST || host,
  port: process.env.PORT || port,
  url: `http://${host}:${port}`,
};
