const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  dbUserName: process.env.DB_USER_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME
};