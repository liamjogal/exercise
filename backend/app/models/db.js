const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");
// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});
// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
  var sql = "CREATE TABLE IF NOT EXISTS excercises (id INT(255), date VARCHAR(255), type VARCHAR(255), sets INT(255), reps INT(255), weight INT(255))";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
module.exports = connection;