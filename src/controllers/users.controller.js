const pool = require('../db/index') ;

// get users by org
exports.getUsersByOrg = async (req,res)=>{
   const orgId = req.params.orgId ;
   try{
      const result = await pool.query('SELECT * FROM organization_users WHERE org_id=$1',[orgId]) ;
      res.json(result.rows) ;
   }catch(err){
      console.log(err) ;
      res.status(500).json({error:'Something went wrong'}) ;
   }
} ;

// add user
exports.addUser = async (req,res)=>{
  const data = req.body ;
  try{
     const result = await pool.query(
       'INSERT INTO organization_users(org_id,user_name,email,role) VALUES($1,$2,$3,$4) RETURNING *',
       [data.org_id,data.user_name,data.email,data.role]
     ) ;
     res.json(result.rows[0]) ;
  }catch(err){
      console.log(err) ;
      res.status(500).json({error:'Cannot add user'}) ;
  }
} ;

// update user
exports.updateUser = async (req,res)=>{
  const id = req.params.id ;
  const data = req.body ;
  try{
     const result = await pool.query(
        'UPDATE organization_users SET user_name=$1, email=$2, role=$3 WHERE user_id=$4 RETURNING *',
        [data.user_name,data.email,data.role,id]
     ) ;
     res.json(result.rows[0]) ;
  }catch(err){
     console.log(err) ;
     res.status(500).json({error:'Cannot update user'}) ;
  }
} ;

// delete user
exports.deleteUser = async (req,res)=>{
  const id = req.params.id ;
  try{
      await pool.query('DELETE FROM organization_users WHERE user_id=$1',[id]) ;
      res.json({message:'User deleted'}) ;
  }catch(err){
      console.log(err) ;
      res.status(500).json({error:'Cannot delete user'}) ;
  }
} ;
