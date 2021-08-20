const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 4000,
  user: "root",
  password: "root",
  database: "SlapStep",
});

connection.connect((err) => {
  if (err) {
    console.error(err);
  }
  console.log("Подключено....");
});
