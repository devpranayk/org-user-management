const express = require('express');
const dotenv = require('dotenv');
const db = require('./db'); // humanized pool
const orgRoutes = require('./routes/orgs.routes');
const userRoutes = require('./routes/users.routes');

  dotenv.config();


  
const app = express();
const PORT = process.env.PORT || 3000;

                  // middleware

app.use(express.json());


                          // health
 app.get('/',   (req,  res) =>  {
  res.send('server alive... hopefully');
} );

             // mount routes
 app.use('/api/orgs', orgRoutes);   // org endpoints
app.use('/api/users', userRoutes); // user endpoints (org-scoped endpoints included)


                        // quick DB test
    db.query ('SELECT NOW()', (err, result) => {
  if (err) {

    console.log('db query failed bruh', err);
  } else {
    
    
    console.log('db connected at: ', result.rows[0].now);
  }


}
);

 
      app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);


}
);
