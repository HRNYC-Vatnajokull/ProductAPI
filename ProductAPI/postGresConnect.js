const pg = require("pg");
const db = new pg.Client({
  host: "18.188.126.5",
  port: 5432,
  user: "postgres",
  password: "docker",
  database: "sdc",
});

db.connect((err) => {
  if (err) console.log(err);
  else console.log("connect");
});

module.exports = db;
