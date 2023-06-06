// const fs = require('fs');
require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'capstone',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
      // ssl: {
      //   ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
      // }
    },
  },
};

// config.json
// {
//   "development": {
//     "username": "root",
//     "password": "root",
//     "database": "capstone",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": "i*G~&:8h<+5re(1C",
//     "database": "capstone",
//     "host": "34.101.99.245",
//     "dialect": "mysql"
//   },
//   "production2": {
//     "username": "dwi",
//     "password": "6cRI8cvXzkzxbJmT37PK5ovTXdHGHAQN",
//     "database": "capstone_pbb7",
//     "host": "dpg-chkdtcm7avj217dgln9g-a.singapore-postgres.render.com",
//     "dialect": "postgres",
//     "dialectOptions": {
//       "ssl": true
//     }
//   }
// }
