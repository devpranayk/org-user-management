const pool = require('../db/index');



                            // get users in org
exports.getUsersByOrg = async (req, res) => {
  const orgId = req.params.orgId;

  try {
    const result   = await pool.query(
      'SELECT user_id, org_id, user_name, role, created_at FROM organization_users WHERE org_id = $1 ORDER BY user_id',
      [orgId]
    );

    res.json(result.rows);

  } catch  (err) {
    console.error('getUsersByOrg error:', err);
    res.status(500).json({ error:    'Something went wrong' });


  }
};

                  // add user in particular org

exports.addUser = async (req, res) => {

    const orgId = req.params.orgId;
  const { user_name, role } = req.body;



  if (!orgId) 
    return res.status(400).json({ error: 'Organization id (orgId) is required in URL' });
  if (!user_name || !role)
       return res.status(400).json({ error: 'user_name and role are required' });


                //  role setup
  const allowed = ['Admin', 'Coordinator', 'Member'];

  if (!allowed.includes(role))   
    return res.status(400).json({ error: `role must be one of ${allowed.join(', ')}` });


  try {
    const result = await pool.query(
      'INSERT INTO organization_users (org_id, user_name, role) VALUES ($1, $2, $3) RETURNING *',
      [orgId, user_name, role]
    );


    res.status(201).json(result.rows[0]);
  } catch (err) {
      console.error('addUser error:', err);
    res.status(500).json({ error: 'Cannot add user' });

  }
};

                      // update user (name & role only)
    
     exports.updateUser = async (req, res) => {


  const id = req.params.id;
  const { user_name, role } = req.body;

  if (!user_name || !role)
     return res.status(400).json({ error: 'user_name and role are required' });

  const allowed = ['Admin', 'Coordinator', 'Member'];
  if (!allowed.includes(role))
     return res.status(400).json({ error: `role must be one of ${allowed.join(', ')}` });

  try {
    const result = await pool.query(
      'UPDATE organization_users SET user_name = $1, role = $2 WHERE user_id = $3 RETURNING *',
      [user_name, role, id]
    );


    if (result.rows.length === 0)
       return res.status(404).json({ error:   'User not found' });
    res.json(result.rows[0]);

  } catch (err)  {
      console.error('updateUser error:', err);
    res.status(500).json({ error: 'Cannot update user' });
  }

};



                  // delete user


exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query('DELETE FROM organization_users WHERE user_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0)
        return res.status(404).json({ error:   'User not found' });
    res.json({ message: 'User deleted' });

  } catch (err) {
    console.error('deleteUser error:', err);
       res.status(500).json({ error: 'Cannot delete user' });

  }



};
