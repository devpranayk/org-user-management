const pool = require('../db/index') ;

// get all orgs
exports.getAllOrgs = async (req,res)=>{
  try{
     const result = await pool.query('SELECT * FROM organizations') ;
     res.json(result.rows) ;
  }catch(err){
     console.log(err) ;
     res.status(500).json({error:'Something went wrong'}) ;
  }
} ;

// get org by id
exports.getOrgById = async (req,res)=>{
   const id = req.params.id ;
   try{
      const result = await pool.query('SELECT * FROM organizations WHERE org_id=$1',[id]) ;
      res.json(result.rows[0]) ;
   }catch(err){
      console.log(err) ;
      res.status(500).json({error:'Something went wrong'}) ;
   }
} ;

// add org
exports.addOrg = async (req,res)=>{
   const data = req.body ;
   try{
       const result = await pool.query(
          'INSERT INTO organizations(org_name,org_slug,org_email) VALUES($1,$2,$3) RETURNING *',
          [data.org_name,data.org_slug,data.org_email]
       ) ;
       res.json(result.rows[0]) ;
   }catch(err){
      console.log(err) ;
      res.status(500).json({error:'Cannot add org'}) ;
   }
} ;

// update org
exports.updateOrg = async (req,res)=>{
  const id = req.params.id ;
  const data = req.body ;
  try{
     const result = await pool.query(
       'UPDATE organizations SET org_name=$1, org_slug=$2, org_email=$3 WHERE org_id=$4 RETURNING *',
       [data.org_name,data.org_slug,data.org_email,id]
     ) ;
     res.json(result.rows[0]) ;
  }catch(err){
     console.log(err) ;
     res.status(500).json({error:'Cannot update org'}) ;
  }
} ;
