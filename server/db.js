const pgp = require('pg-promise')()

// Database connection details
const dbConfig = {
    host: 'localhost',
    port: '5432',
    database: 'app',
    user: 'postgres',
    password: '12345'
}

// Create a new database instance
const db = pgp(dbConfig)

module.exports = db