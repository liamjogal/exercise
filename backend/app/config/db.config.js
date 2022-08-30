var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Poop123$"
});

con.query("CREATE DATABASE IF NOT EXISTS testdb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Poop123$",
    DB: "testdb"
  };