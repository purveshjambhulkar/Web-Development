const mysql = require('mysql');

// Create connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwerty123@sql",
  database: "delta",
});


connection.query(`select *  from user;`, function (err, result, fields) {
  if (err) {
    return console.log(err);
  }
  return console.log(result);
})