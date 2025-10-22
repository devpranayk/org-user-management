const express  = require('express') ;
const cors = require('cors') ;

const app = express() ;

app.use(cors()) ;
app.use(express.json()) ;

// routes
const orgsRoutes = require('./routes/orgs.routes') ;
const usersRoutes = require('./routes/users.routes') ;

app.use('/api/orgs' , orgsRoutes) ;
app.use('/api/users', usersRoutes) ;

const PORT = process.env.PORT || 5000 ;

app.listen(PORT , ()=> console.log('Server running on port' , PORT)) ;
