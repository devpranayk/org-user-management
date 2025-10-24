const express = require('express')
const dotenv = require('dotenv')
const db = require('./db')  // yeah using this here

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send("server alive... hopefully")
})

db.query('SELECT NOW()', (err, result) => {
    if (err) {
        console.log("db query failed bruh", err)
    } else {
        console.log("db connected at: ", result.rows[0].now)
    }
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
