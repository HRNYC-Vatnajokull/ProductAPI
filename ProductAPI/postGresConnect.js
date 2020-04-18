const pg = require("pg");
const db = new pg.Client({
  host: "172.31.20.101",
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
