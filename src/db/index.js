
const { Pool } = require('pg')
require('dotenv').config()

console.log("DB_USER:", process.env.DB_USER)
console.log("DB_PASSWORD:", process.env.DB_PASSWORD)


let pool 

try {
    pool = new Pool({
        host: process.env.DB_HOST, 
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })

    console.log("pool created.. maybe its fine idk")
} catch (err) {
    console.log("db pool messed up : ", err)
}

module.exports = pool
