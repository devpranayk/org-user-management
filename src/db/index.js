const { Pool } = require('pg');


require('dotenv').config();



    let pool;

try {

  pool = new Pool({


    host: process.env.DB_HOST,
     port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

  });



  console.log("pool created.");
} catch (err) {

  console.log("db pool creation error : ", err);
}

module.exports = pool;
