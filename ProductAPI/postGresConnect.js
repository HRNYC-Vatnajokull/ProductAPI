const pg = require("pg");
const db = new pg.Client({
  host: "0.0.0.0",
  port: 5432,
  user: "postgres",
  password: "password",
  database: "sdc",
});

db.connect((err) => {
  if (err) console.log(err);
  else console.log("connect");
});

module.exports = db;
