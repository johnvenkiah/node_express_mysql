const mysql = require('mysql');
const dbConfig = require('../configuration/db.config.js');

// Create connection to database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

// Open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log('Successfully connected to database');
});

module.exports = connection;
