const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "meytier",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
