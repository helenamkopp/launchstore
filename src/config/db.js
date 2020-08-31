const { Pool } = require("pg")

module.exports = new Pool({
  user: 'helena',
  password: "helena123",
  host: "localhost",
  port: 5432,
  database: "launchstoredb"
})