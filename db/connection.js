const mySql = require('mysql2');
require('dotenv').config();

const db = mySql.createConnection(
  {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.NAME,
  },
  console.log(`Connected to the classlist_db database.`)
);

module.exports = db;
