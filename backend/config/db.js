const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "dbmsproject",
});

db.connect((err) => {
  if (err) {
    console.error("Database connect++ion failed:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

module.exports = db;
